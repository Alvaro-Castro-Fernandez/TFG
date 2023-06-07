import { Injectable } from "@angular/core";
import { ProductInterface } from "../interfaces/products.interface";
import { DocumentService } from "./document.service";
import { Data } from "@angular/router";

@Injectable({
   providedIn: 'root'
})
export class ShoppingListService {

   constructor(
      private ds: DocumentService
   ) {
   }

   getAdminAllProducts() {
      return this.ds.list<ProductInterface>('/products')
   }

   getAdminAllAccounts() {
      return this.ds.list<ProductInterface>('/accounts')
   }

   async deleteAdminRow(path:string, ref:Data){
      await this.ds.delete(path,ref)
   }

}                                                                                                                     
