import { Injectable } from '@angular/core';
import {
  Firestore,
  docData, collectionData,
  Timestamp, DocumentReference, Transaction,
  collection, doc, updateDoc, setDoc, deleteDoc, query, QueryConstraint,
  serverTimestamp, collectionGroup, getDocs, where,
} from "@angular/fire/firestore";
import { firstValueFrom, Observable } from "rxjs";
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


  private error(message = 'Error al guardar el documento') {
    this.app.loaded()
    console.log(message, 'cerrar');
  }

  setByAttr(path: string, data: Data, attr: string) {
    data["createdAt"] = serverTimestamp();
    data["updatedAt"] = serverTimestamp();
    return setDoc(doc(this.db, path, data[attr]), data, { merge: true })
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

}