import { Component } from "@angular/core";
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
  getAviableSizes:[] = []

  constructor(
    private route: ActivatedRoute,
    private db: DocumentService
    ) {
    this.getProduct();
  }

  async getProduct() {
    this.productData = await this.db.getByAttrr('products/', 'id', this.productId);
    console.log(this.productData);
    this.getAviableSizes = this.productData.clotheSize
    console.log(this.getAviableSizes);
    
  }

}