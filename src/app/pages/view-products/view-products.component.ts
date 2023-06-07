import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { EMPTY, Observable, firstValueFrom, take, tap } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent {

  products$: Observable<any[]> = EMPTY;
  accounts$: Observable<any[]> = EMPTY;
  productListColumns: string[] = ['name', 'id', 'description', 'size', 'price', 'actions'];
  accountListColumns: string[] = ['id', 'name', 'lastName', 'postalCode', 'email', 'actions'];
  arrDataWithProducts!: any[];
  arrDataWithAccounts: any

  constructor(
    private snackbar: MatSnackBar,
    private sls: ShoppingListService
  ) {
    this.getProductList()
    this.getAccountList()
  }

  getProductList() {
    this.products$ = this.sls.getAdminAllProducts().pipe(
      tap(products => {
        this.arrDataWithProducts = products
      })
    )
  }

  getAccountList() {
    this.accounts$ = this.sls.getAdminAllAccounts().pipe(
      tap(accounts => {
        this.arrDataWithAccounts = accounts
      })
    )
  }



  removeFromProductList(dataId: string) {
    try {
      let index = this.arrDataWithProducts.findIndex((item: any) => {
        return item.id === dataId;
      });
      this.sls.deleteAdminRow('/products/', this.arrDataWithProducts[index])
      this.openSnackBar("El producto se ha borrado de la base de datos.", "OK")
    } catch (error) {
      console.log(error);
    }
  }

  removeFromAccountList(dataId: string) {
    try {
      let index = this.arrDataWithAccounts.findIndex((item: any) => {
        return item.id === dataId;
      });
      if (this.arrDataWithAccounts[index].id === "2oL1ZjCBZrQJj04lAUC5mN0OTW82") {
        throw new Error("No puedes hacer esta accion.")
      } else {
        this.sls.deleteAdminRow('/accounts/', this.arrDataWithAccounts[index])
        this.openSnackBar("La cuenta se ha borrado de la base de datos.", "OK");
      }
    } catch (error) {
      console.log(error);
    }
  }

  openSnackBar(args: string, action: string) {
    this.snackbar.open(args, action);
  }

}

