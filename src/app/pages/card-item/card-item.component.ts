import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CardItemService } from 'src/app/services/card-item.service';


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {

  testArray: any[] = [];
  products$: Observable<any[]> = EMPTY;
  aux:any
  public arrProducts: any[] = [];
  isAdmin$: Observable<boolean> = EMPTY;
  isAdmin: boolean = false;

  @ViewChild('categoryInput')
  arrInput!: ElementRef<HTMLInputElement>;
  obs!: Observable<any>;

  constructor(
    private router: Router,
    private cis: CardItemService,
  ) {
    this.getArrayProducts();
  }

  getArrayProducts() {
    try {
       this.products$ = this.cis.getAllProducts().pipe(
      tap(products => {
        this.aux = products        
        for (let index = 0; index < this.aux.length; index++) {
          this.arrProducts.push(this.aux[index])
        }
      })
    )
    } catch (error) {
      console.log("Error al listar los productos ==>"+error);
    }
  }

  viewProduct(id: string) {
    this.router.navigate([`/main/${id}`]);
  }
}