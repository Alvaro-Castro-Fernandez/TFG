import { Component, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { ActivatedRoute } from "@angular/router";
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

  constructor(
    private route: ActivatedRoute,
    private db: DocumentService,
    private auth: Auth,
  ) {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid
      console.log(this.auth.currentUser.uid);
      this.getProduct();
      console.log(this.productId);
    }
  }

  async getProduct() {
    this.productData = await this.db.getByAttrr('products/', 'id', this.productId);
    console.log(this.productData);
    this.getAviableSizes = this.productData.clotheSize
    console.log(this.getAviableSizes);
  }

  AddToTheShoppingList() {

  }

}