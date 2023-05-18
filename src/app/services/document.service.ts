import { Injectable } from '@angular/core';
import {
  Firestore,
  docData, collectionData,
  Timestamp, DocumentReference, Transaction,
  collection, doc, updateDoc, setDoc, deleteDoc, runTransaction,
  limit, orderBy, query, QueryConstraint,
  serverTimestamp, startAfter, writeBatch, collectionGroup, getDocs, where,
} from "@angular/fire/firestore";
import { firstValueFrom, Observable, throwError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { DocumentData } from "rxfire/firestore/interfaces";
import { AppService } from "./app.service";

export interface BaseDocument {
  readonly id: string
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}

interface Data {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private app: AppService,
    private db: Firestore,
  ) {
  }

  createId(path: string) {
    return doc(collection(this.db, path)).id;
  }

  list<T>(path: string, queryConstraint: QueryConstraint[] = []) {
    try {
      return collectionData(query(collection(this.db, path), ...queryConstraint)) as Observable<T[]>;
    } catch (e) {
      this.error('Error al listar los documentos')
      throw e;
    }
  }

  listP<T>(path: string, queryConstraint: QueryConstraint[] = []) {
    try {
      return firstValueFrom(collectionData(query(collection(this.db, path), ...queryConstraint))) as Promise<T[]>;
    } catch (e) {
      this.error('Error al listar los documentos')
      throw e;
    }
  }

  listGroup<T>(path: string, queryConstraint: QueryConstraint[] = []) {
    try {
      return collectionData(query(collectionGroup(this.db, path), ...queryConstraint)) as Observable<T[]>;
    } catch (e) {
      this.error('Error al listar los documentos')
      throw e;
    }
  }

  listGroupP<T>(path: string, queryConstraint: QueryConstraint[] = []) {
    try {
      return firstValueFrom(collectionData(query(collectionGroup(this.db, path), ...queryConstraint))) as Promise<T[]>;
    } catch (e) {
      this.error('Error al listar los documentos')
      throw e;
    }
  }

  pagination<T>(path: string, documents: any[], limitTo = 10, queryConstrains: QueryConstraint[] = []) {
    try {
      const constraints = [...queryConstrains]
      constraints.push(orderBy('updatedAt', 'desc'));
      const lastDocument = documents[documents.length - 1];

      if (lastDocument) {
        constraints.push(startAfter(lastDocument.updatedAt))
      }

      constraints.push(limit(limitTo))
      return collectionData(query(collection(this.db, path), ...constraints))
        .pipe(
          map(newDocuments => documents.concat(newDocuments))
        ) as Observable<T[]>;
    } catch (e) {
      this.error('Error al listar los documentos')
      throw e;
    }
  }

  get<T>(path: string): Observable<T>
  get<T>(path: string, transaction: Transaction): Promise<T>
  get<T>(path: string, transaction?: Transaction) {
    try {
      const docRef = doc(this.db, path);

      console.log(`getting document ${path}`)
      return transaction ? transaction.get(docRef) : docData(docRef) as Observable<T>
    } catch (e) {
      this.error('Error al obtener el documento')
      throw e;
    }
  }

  
/*   getByAttr<T>(path: string, attr: string, value: any): Observable<T>
  getByAttr<T>(path: string, attr: string, value: any, transaction: Transaction): Promise<T>
  getByAttr<T>(path: string, attr: string, value: any, transaction?: Transaction) {
    try {
      let id = "";
      console.log(id);
      
        getDocs((query(collection(this.db, path), where(attr, "==", value)))).then(data => {
          console.log(data);        
        });

      // const docRef = doc(this.db, path, attr[value]);
      console.log(`getting document ${path}`)
      return; // transaction ? transaction.get(docRef) : docData(docRef) as Observable<T>;
    } catch (e) {
      this.error('Error al obtener el documento')
      throw e;
    }
  } */

  async getByAttrr(path: string, attr: string, value: any){
    try {
      const data = await getDocs((query(collection(this.db, path), where(attr, "==", value))));
      return data.docs[0].data();
    } catch (error) {
      return undefined;
    }
    
  }


  create(path: string, data: Data): Promise<DocumentReference<DocumentData>>
  create(path: string, data: Data, transaction: Transaction): Transaction
  create(path: string, data: Data, transaction?: Transaction) {
    try {
      const id = data["id"] ? data["id"] : this.createId(path);
      const dbData = {
        ...data,
        id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const docRef = doc(this.db, path, id);

      console.log(`creating document ${path}`, data)
      if (transaction) {
        return transaction.set(docRef, dbData);
      } else {
        return new Promise<DocumentReference<DocumentData>>(async (resolve) => {
          await setDoc(docRef, dbData)
          resolve(docRef);
        });
      }
    } catch (e) {
      this.error()
      throw e;
    }
  }

  set(path: string, data: Data): Promise<void>
  set(path: string, data: Data, transaction: Transaction): Transaction
  set(path: string, data: Data, transaction?: Transaction) {
    try {
      data["createdAt"] = serverTimestamp();
      data["updatedAt"] = serverTimestamp();

      const docRef = doc(this.db, path, data["id"]);

      console.log(`setting document ${path}`, data);
      return transaction ? transaction.set(docRef, data) : setDoc(docRef, data);
    } catch (e) {
      this.error()
      throw e;
    }
  }

  update(path: string, data: Data): Promise<void>
  update(path: string, data: Data, transaction: Transaction): Transaction
  update(path: string, data: Data, transaction?: Transaction) {
    try {
      data["updatedAt"] = serverTimestamp();
      const docRef = doc(this.db, path, data['id']);
      console.log(`updating document ${path}`, data)
      return transaction ? transaction.update(docRef, data) : updateDoc(docRef, data);
    } catch (e) {
      this.error()
      throw e;
    }
  }

  updateQuery(path: string, data: Data, queryConstraint: QueryConstraint[]) {
    const source = this.list<DocumentData>(path, queryConstraint)
      .pipe(
        tap(docs => docs.forEach(doc => doc['update'](data))),
      )

    return firstValueFrom(source);
  }

  delete(path: string, data: Data): Promise<void>
  delete(path: string, data: Data, transaction: Transaction): Transaction
  delete(path: string, data: Data, transaction?: Transaction) {
    try {
      const docRef = doc(this.db, path, data['id']);
      console.log(`deleting document ${path}`, data)
      return transaction ? transaction.delete(docRef) : deleteDoc(docRef);
    } catch (e) {
      this.error('Error al borrar el documento')
      throw e;
    }
  }

  async transaction(callback: (transaction: Transaction) => void) {
    try {
      await runTransaction(this.db, async (transaction) => callback(transaction));
    } catch (e) {
      this.error('Error al realizar la transacción')
      throw e;
    }
  }

  private error(message = 'Error al guardar el documento') {
    this.app.loaded()
    console.log(message, 'cerrar');
  }

  /**
   * TODO
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * !!!! OLD IMPLEMENTATION !!!
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   */

  setByAttr(path: string, data: Data, attr: string) {
    data["createdAt"] = serverTimestamp();
    data["updatedAt"] = serverTimestamp();
    return setDoc(doc(this.db, path, data[attr]), data, { merge: true })
  }

  setCandidate(need: Data, data: Data, profile: Data) {

    const batch = writeBatch(this.db);

    const profileNeed = this.updateProfileNeed(need, profile)
    data["createdAt"] = serverTimestamp();
    data["updatedAt"] = serverTimestamp();

    const cRef = doc(this.db, `needs/${need['id']}/candidates`, data['profileId']);
    batch.set(cRef, data, { merge: true });

    const pRef = doc(this.db, `profiles/${data['profileId']}`);
    batch.update(pRef, profileNeed);

    return batch.commit();
  }

  updateByAttr(path: string, data: Data, attr: string) {
    if (data["updateState"]) {
      data["updatedAt"] = serverTimestamp();
      delete data["updateState"];
    }
    if (data["autoFeedback"] === true && !data["autoFeedbackSend"]) {
      data["autoFeedbackSend"] = false;
    }
    return updateDoc(doc(this.db, path, data[attr]), data)
  }

  batchUpdateByAttr(path: string, data: Data[], attr: string) {
    const batch = writeBatch(this.db);
    data.forEach(element => {
      if (element["updateState"]) {
        element["updatedAt"] = serverTimestamp();
        delete element["updateState"];
      }
      batch.update(doc(this.db, path, element[attr]), element);
    })
    return batch.commit();
  }

  batchUpdateSubCollection(path: string, subPath: string, data: Data[]) {
    try {
      const result = [];
      const chunk = 499;
      let count = 0;
      for (let i = 0; i < data.length; i += chunk) {
        result.push(data.slice(i, i + chunk));
        result.forEach(async batchData => {
          console.log(batchData);
          const batch = writeBatch(this.db);
          batchData.forEach(element => {
            if(element["id"] !== undefined){
              batch.update(doc(this.db, path + "/" + element["needId"] + '/' + subPath, element["id"]), element); 
            }
          });
          await batch.commit();
          console.log(count++);
        });
        
      }

      return;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  updateProfileNeed(need: Data, profile: Data) {
    let data = {
      id: need['id'],
      name: need['name'],
      clientName: need['clientName'],
      status: need['status']
    }
    if (profile['needs'] && profile['needs'].length) {
      if (!profile['needs'].some((profileNeed: any) => profileNeed.id === data.id)) {
        profile['needs'].push(data);
      }
      return {
        needs: profile['needs'], updatedAt: serverTimestamp()
      }
    } else {
      profile['needs'] = []
      profile['needs'].push(data)
      return {
        needs: profile['needs'],
        updatedAt: serverTimestamp()
      }
    }
  }

  async batchNeedStatusUpdate(path: string, data: Data) {

    let update = {
      docUpdated: 0,
      existsError: 0,
      needExistError: 0
    }
    try {
      await runTransaction(this.db, async (transaction) => {
        data['ids'].forEach(async (id: string) => {
          const sfDoc = await transaction.get(doc(this.db, `${path}/${id}`));
          if (!sfDoc.exists()) {
            update.existsError++;
            console.log(`Document ${id} does not exist!`);
            throw throwError(new Error(`Document ${id} does not exist!`));
          }
          if (Array.isArray(sfDoc.data()['needs'])) {
            let index = sfDoc.data()['needs'].findIndex((need: any) => need.id === data['data']['needId'])
            if (index === -1) {
              update.needExistError++;
              console.log(`Need ${data['data']['needId']} does not exist in profile ${id} !`);
              throw throwError(new Error(`Need ${data['data']['needId']} does not exist in profile ${id} !`));
            } else {
              let profile = { needs: sfDoc.data()['needs'] };
              profile.needs[index].status = data['data']['status'];
              transaction.update(doc(this.db, `${path}/${id}`), profile)
              update.docUpdated++;
            }
          } else {
            update.needExistError++;
            console.log(`Need ${data['data']['needId']} does not exist in profile ${id} !`);
            throw throwError(new Error(`Need ${data['data']['needId']} does not exist in profile ${id} !`));
          }
        })
        const needDocRef = await transaction.get(doc(this.db, `needs/${data['data']['needId']}`));
        if (!needDocRef.exists()) {
          console.log(`Need ${data['data']['needId']} does not exist!`);
          throw throwError(new Error(`Need ${data['data']['needId']} does not exist!`));
        }
        transaction.update(doc(this.db, `needs/${data['data']['needId']}`), { status: data['data']['status'], reasonToClose: data['data']['reasonToClose'] })
      });
      console.log("Transaction successfully committed!, documents updated: " + JSON.stringify(update));
    } catch (e) {
      throw Promise.reject(new Error(`Transaction failed: ${e} \\n ${JSON.stringify(update)}`));
    }
  }

}