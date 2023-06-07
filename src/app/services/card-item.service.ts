import { Injectable } from "@angular/core";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { ProductInterface } from "../interfaces/products.interface";
import { DocumentService } from "./document.service";

 @Injectable({
    providedIn:'root'
 })
 export class CardItemService{

    constructor(
        private ds:DocumentService
    ){
    }

    getAllProducts(){
        return this.ds.list<ProductInterface>('/products')
    }

    async addProduct(product:any):Promise<DocumentReference<DocumentData>>{
        return this.ds.create('/products',product);
    }
 }