import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { Express, request } from 'express';
import { CorsOptions } from 'cors';
import { Request } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

  shoppingList: any
  userId: any
  shoppingListColumns: string[] = ['name', 'productId', 'ammount', 'size', 'totalPrice', 'actions'];
  favListColumns: string[] = ['name', 'productId', 'price', 'actions'];
  arrDataWithShoppingList: any
  aux: any
  arrDataWithFavList:any
  favList: any
  totalPrice: number = 0

  constructor(
    private ds: DocumentService,
    private auth: Auth,
    private snackbar: MatSnackBar
  ) {
    this.getUserId()
    this.getShoppingList()
    this.getFavList()
  }
  
  async getShoppingList() {
    this.shoppingList = await firstValueFrom(this.ds.get('/shoppinglist/' + this.userId))
    this.arrDataWithShoppingList = this.shoppingList.products;
    for (let index = 0; index < this.arrDataWithShoppingList.length; index++) {
      console.log(this.arrDataWithShoppingList[index]);
      this.totalPrice = this.totalPrice+parseFloat(this.arrDataWithShoppingList[index].totalPrice)
    }
  }

  async getFavList() {
    this.favList = await firstValueFrom(this.ds.get('/favlist/' + this.userId))
    this.arrDataWithFavList = this.favList.favorites
  }

  getUserId() {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid
      return true;
    } else {
      return false;
    }
  }

  async removeFromShoppingList(data: string, dataId: string) {
    this.aux = await firstValueFrom(this.ds.get('/shoppinglist/' + this.userId))
    let newArray: [] = this.aux.products;
    newArray.splice(data.indexOf(dataId), 1)
    this.aux.products = newArray
    await this.ds.update('/shoppinglist', this.aux);
    this.openSnackBar("El producto se ha quitado de la cesta.","OK")
  }

  async removeFromFavList(data: string, dataId: string){
    this.aux = await firstValueFrom(this.ds.get('/favlist/' + this.userId))
    let newArray: [] = this.aux.favorites;
    newArray.splice(data.indexOf(dataId), 1)
    this.aux.favorites = newArray
    await this.ds.update('/favlist', this.aux);
    this.openSnackBar("El producto se ha quitado de la lista de favoritos.","OK")
  }
  
  openSnackBar(args:string, action:string){
    this.snackbar.open(args,action);
  }

}

//====================================================
//            INTENTO DE PAYPAL
//====================================================

// CLIENT: string = "AY28oIGjaBcHxSXDSRmFvmHbXNh324R4XZbftw3y345U2MZa_D2EuidjIOrKmAaPofdyjkL7QecQx2Zk"
// SECRET: string = "EMK7dTxC7K0_7CvIMimgBBMW0KRTHTFvES4EYKwVAYHgkTKDXgMoEHVBlFCZMfDpaGMV9p46T6HR4gYs"
// PAYPAL_API: string = "https://api-m.sandbox.paypal.com";
// AUTH: {} = { user: this.CLIENT, password: this.SECRET };
// aux:any;
// app:any
 // createPayment(req: any, res: any) {
  // const body = {
  //   intent: 'CAPTURE',
  //   purchase_units: [{
  //     amount: {
  //       currency_code: 'EUR',
  //       value: '150'
  //     }
  //   }],
  //   aplication_context: {
  //     brand_name: "MiTienda.com",
  //     landing_page:'Default',
  //     user_aplication: 'PAY_NOW',
  //     return_url:'http://localhost:4200/shoppingList',
  //     cancel_url:'http://localhost:4200/main'
  //   }
  // }
  // request.post(`${this.PAYPAL_API}/v2/checkout/orders`,{
  //   auth :this.AUTH,
  //   body,
  //   json:true
  // },(err:any, response:any)=>{
  //   res.json({data:response.body})
  // })
  // async generateAccessToken(): Promise<string>{
  //   try {
  //     const auth = Buffer.from(`${this.CLIENT}:${this.SECRET}`).toString("base64");
  //     const response = await fetch(`${this.PAYPAL_API}/v1/oauth2/token`, {
  //       method: "post",
  //       body: "grant_type=client_credentials",
  //       headers: {
  //         Authorization: `Basic ${auth}`,
  //       },
  //     });
  
  //     const data = await response.json();
  //     return data.access_token;
  //   } catch (error) {
  //     console.error("Failed to generate Access Token:", error);
  //     throw error;
  //   }
  // };
  
  // async createOrder(): Promise<any>{
  //   const accessToken = await this.generateAccessToken();
  //   const url = `${this.PAYPAL_API}/v2/checkout/orders`;
  //   const payload = {
  //     intent: "CAPTURE",
  //     purchase_units: [
  //       {
  //         amount: {
  //           currency_code: "USD",
  //           value: "0.02",
  //         },
  //       },
  //     ],
  //   };
  
  //   const response = await fetch(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //   });
  
  //   return this.handleResponse(response);
  // };
  
  // async capturePayment(orderID: string): Promise<any>{
  //   const accessToken = await this.generateAccessToken();
  //   const url = `${this.PAYPAL_API}/v2/checkout/orders/${orderID}/capture`;
  
  //   const response = await fetch(url, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  
  //   return this.handleResponse(response);
  // };
  
  // async handleResponse(response: Response) {
  //   if (response.status === 200 || response.status === 201) {
  //     return response.json();
  //   }
  
  //   const errorMessage = await response.text();
  //   throw new Error(errorMessage);
  // }
  
  // app.post("/orders", async (req: Request, res: Response) => {
  //   try {
  //     const response = await this.createOrder();
  //     res.json(response);
  //   } catch (error) {
  //     console.error("Failed to create order:", error);
  //     res.status(500).json({ error: "Failed to create order." });
  //   }
  // });
  
  // app.post("/orders/:orderID/capture", async (req: Request, res: Response) => {
  //   try {
  //     const { orderID } = req.params;
  //     const response = await this.capturePayment(orderID);
  //     res.json(response);
  //   } catch (error) {
  //     console.error("Failed to create order:", error);
  //     res.status(500).json({ error: "Failed to capture order." });
  //   }
  // });
  
  // app.listen(9597, () => {
  //   console.log("listening on http://localhost:9597/");
  // });
  // }

