import { Component } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //Esta parte de codigo es para crear un boton temporal para meter productos temporales en la base de datos
  
  obj = [{
    name: "Gorra Suicidal Tendences",
    categories: ["Accesorios", "Gorras"],
    price: 19.99,
    onSale: true,
    discount: 0.10,
    stock: 15,
    description: "Una gorra deportiva cómoda y transpirable.",
    clotheSize: ["Única"],
    country: ["China"],
    urlTo: "https://popskateshop.com/pub/media/catalog/product/cache/31a8f1c8ce125526f77682e8a2de5c4b/d/o/dogtown-suicidal-flip-suicidal-skates-mesh-hat-black_1.jpg"
  },
  {
    name: "Bolso de mano",
    categories: ["Accesorios", "Bolsos"],
    price: 39.99,
    onSale: true,
    discount: 0.25,
    stock: 8,
    description: "Un elegante bolso de mano para completar tu look.",
    clotheSize: undefined,
    country: ["Italia"],
    urlTo: "https://www.emp-online.es/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw629b6c6f/images/4/7/1/3/471359a.jpg?sfrm=png"
  },
  {
    name: "Pantalones vaqueros",
    categories: ["Ropa", "Pantalones"],
    price: 59.99,
    onSale: false,
    discount: null,
    stock: 5,
    description: "Un par de pantalones vaqueros clásicos y duraderos.",
    clotheSize: ["M", "L", "XL"],
    country: ["España"],
    urlTo: "https://www.emp-online.es/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwca4d4bfa/images/3/4/2/5/342598za-emp.jpg?sfrm=png"
  }];
  constructor(private db:DocumentService){

  }

  async addToDB(){
    for (let index = 0; index < this.obj.length; index++) {
      await this.db.create('products',this.obj[index])
      console.log("added " + index);
    }
  }
}
