import { Component } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  aux = [{
    name: "Gorro",
    categories: ["Ropa", "Gorro"],
    price: 10.99,
    onSale: true,
    discount: 5,
    stock: 100,
    description: "Un gorro de lana que puedes llevar en invierno.",
    clotheSize: ["S", "M", "L"],
    country: ["Alemania", "España", "Francia"],
    urlTo: "gorro.jpg"
  }, {
    name: "Camiseta de botones",
    categories: ["Ropa", "Camisa", "Botones"],
    price: 34.50,
    onSale: false,
    stock: 20,
    description: "Una camiseta de botones de cuadros.",
    clotheSize: ["M", "L", "XL","XXL"],
    country: ["Italia", "Dinamarca"],
    urlTo: "camisetadebotones.jpg"
  }, {
    name: "Colgante",
    categories: ["Accesorio", "Colgante"],
    price: 5.00,
    onSale: true,
    discount: 12,
    stock: 70,
    description: "Un colgante unisex que combina con cualquier camiseta.",
    clotheSize: ["Única"],
    country: ["España", "Portugal"],
    urlTo: "colgante.jpg"
  }, {
    name: "Gorra",
    categories: ["Ropa", "Gorra", "Accesorio"],
    price: 9.99,
    onSale: false,
    stock: 10,
    description: "Una gorra comoda de color negro para tus conjuntos de ropa.",
    clotheSize: ["Única"],
    country: ["EEUU"],
    urlTo: "gorra.jpg"
  }, {
    name: "Pantalón",
    categories: ["Ropa", "Pantalones"],
    price: 35.00,
    onSale: true,
    discount: 20,
    stock: 200,
    description: "Pantalones elasticos ideales para hacer deporte.",
    clotheSize: ["S", "M", "L", "XL", "XXL"],
    country: ["Inglaterra", "España", "Alemania"],
    urlTo: "pantalon.jpg"
  }, {
    name: "Pendientes de oro",
    categories: ["Accesorios"],
    price: 3.00,
    onSale: false,
    stock: 100,
    description: "Un par de pendientes de oro. Solo te hace falta un buen vestido.",
    clotheSize: ["Única"],
    country: ["España", "Francia"],
    urlTo: "Pendientes.jpg"
  }, {
    name: "Pantalón Vaqueros",
    categories: ["Ropa", "Pantalones"],
    price: 60.50,
    onSale: true,
    discount: 27,
    stock: 55,
    description: "Estos pantalones vaqueros son los mas comodos de esta tienda.",
    clotheSize: ["XS","S", "M", "L", "XL", "XXL"],
    country: ["Alemania"],
    urlTo: "pantalonesvaquero.jpg"
  }, {
    name: "Pulsera",
    categories: ["Accesorio"],
    price: 12.99,
    onSale: false,
    stock: 150,
    description: "Una pulsera de piedras negras con una joya en el centro.",
    clotheSize: ["Única"],
    country: ["Alemania", "España", "Francia"],
    urlTo: "pulsera.jpg"
  }, {
    name: "Sudadera",
    categories: ["Ropa", "Sudadera"],
    price: 70.00,
    onSale: true,
    discount: 15,
    stock: 230,
    description: "Una sudadera de algodón e ideal para otoño.",
    clotheSize: ["XS","S","M","L","XL"],
    country: ["Italia", "España", "Inglaterra"],
    urlTo: "Sudadera.jpg"
  }, {
    name: "Vestido",
    categories: ["Ropa", "Vestido"],
    price: 45.99,
    onSale: false,
    stock: 90,
    description: "Un vestido blanco precioso. Solo hacen falta unos pendientes a juego.",
    clotheSize: ["M","L","XL",],
    country: ["Inglaterra", "Alemania"],
    urlTo: "vestido.jpg"
  }, {
    name: "Zapatillas",
    categories: ["Ropa", "Calzado"],
    price: 60.00,
    onSale: true,
    discount: 30,
    stock: 450,
    description: "Unas zapatillas unisex de color negro ideales para hacer deporte o para usar a diario.",
    clotheSize: ["38","40","42","44","46"],
    country: ["España", "Alemania", "Italia"],
    urlTo: "zapatillas.jpg"
  }]

  constructor(private ds: DocumentService) { 
  }
  async addNew(){
    for (let index = 0; index < this.aux.length; index++) {
      await this.ds.create("/products",this.aux[index])
      
    }
    
  }

}
