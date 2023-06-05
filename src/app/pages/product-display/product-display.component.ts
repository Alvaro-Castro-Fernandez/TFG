import { Component} from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { DocumentService } from "src/app/services/document.service";

@Component({
  selector: 'app-card-item',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})

export class ProductDisplayComponent {
  productId = this.route.snapshot.paramMap.get('id')
  productData: any;
  getAviableSizes: [] = []
  userId = "";
  productForm!: FormGroup
  auxArrayWithProductData: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ds: DocumentService,
    private auth: Auth,
    private snackbar: MatSnackBar
  ) {
    this.getProduct();
    this.productForm = new FormGroup({
      size: new FormControl(''),
      ammount: new FormControl('')
    })
  }

  async getProduct() {
    this.productData = await this.ds.getByAttrr('products/', 'id', this.productId);
    this.getAviableSizes = this.productData.clotheSize
  }

  async AddToTheShoppingList() {
    if (this.currentUserIsLogged()) {
      if (this.productForm.valid) {
        let productInfo = {
          productId: this.productId,
          size: this.productForm.get("size")?.value,
          name: this.productData.name,
          ammount: this.productForm.get("ammount")?.value,
          totalPrice: parseFloat(this.productForm.get("ammount")?.value) * parseFloat(this.productData.price)
        }
        let shoppingListObjectData = { id: this.userId, products: [{ ...productInfo }] };
        this.auxArrayWithProductData = await firstValueFrom(this.ds.get('/shoppinglist/' + this.userId));
        if (this.auxArrayWithProductData === undefined) {
          await this.ds.create('/shoppinglist', shoppingListObjectData);
          this.openSnackBar("Se ha añadido al carrito de la compra","Aceptar")
        } else {
          this.auxArrayWithProductData.products.push(productInfo);
          await this.ds.update('/shoppinglist/', this.auxArrayWithProductData);
          this.openSnackBar("Se ha añadido al carrito de la compra","Aceptar")
        }
      } else {
        this.openSnackBar("Rellena todos los campos","Aceptar")
        this.productForm.reset()
      }
    } else {
      this.openSnackBar("Tienes que iniciar sesión antes para poder añadir productos al carrito","Aceptar")

      this.router.navigate(['/login'])
    }
    this.auxArrayWithProductData = undefined;
  }

  async AddToTheFavList() {
    if (this.currentUserIsLogged()) {
      let favList = {
        productId: this.productId,
        name: this.productData.name,
        price: parseFloat(this.productData.price)
      }
      let createNewFavList = { id: this.userId, favorites: [{ ...favList }] };
      console.log("buscando registro...");
      this.auxArrayWithProductData = await firstValueFrom(this.ds.get('/account/' + this.userId));
      if (this.auxArrayWithProductData === undefined) {
        await this.ds.create('/favlist', createNewFavList);
        this.openSnackBar("Este producto se ha añadidos a favoritos", "Aceptar")
      } else {
        this.auxArrayWithProductData.products.push(favList);
        console.log("Añadiendo datos... ==>" + this.auxArrayWithProductData);
        await this.ds.update('/favlist/', this.auxArrayWithProductData);
        this.openSnackBar("Este producto se ha añadidos a favoritos", "Aceptar")
      }
    } else { 
      this.openSnackBar("Tienes que iniciar sesión antes para poder añadir productos a favoritos","Aceptar")
      this.router.navigate(['/login'])
    }
  }

  currentUserIsLogged() {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid
      return true;
    } else {
      return false;
    }
  }
  
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }

}