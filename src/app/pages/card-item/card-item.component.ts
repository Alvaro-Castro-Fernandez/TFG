import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DocumentService } from 'src/app/services/document.service';


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {

  testArray: any[] = [];
  products: any;
  aux = [{}]
  public arrProducts: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categotyControl = new FormControl('');
  filteredCategories!: Observable<string[]>;
  categories: string[] = ['Todo'];
  allCategories: any[] = [];

  @ViewChild('categoryInput')
  arrInput!: ElementRef<HTMLInputElement>;
  obs!: Observable<any>;

  constructor(
    private ds: DocumentService,
    private router: Router
  ) {
    this.getAllProducts();
    this.getAllCategories()
  }

  async getAllProducts() {
    this.products = await firstValueFrom(this.ds.list('products'))
    this.aux = this.products
    for (let index = 0; index < this.aux.length; index++) {
      this.arrProducts.push(this.aux[index])
    }
  }

 
  remove(data: string): void {
    const index = this.categories.indexOf(data);
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  viewProduct(id: string) {
    this.router.navigate([`/main/${id}`]);
  }

  async getAllCategories() {
    let aux: any = await firstValueFrom(this.ds.list("/products"));
    // console.log(aux);
    for (let x = 0; x < aux.length; x++) {
      for (let y = 0; y < aux[x].categories.length; y++) {
        // console.log(aux[x].categories[y]);
        this.allCategories.push(aux[x].categories[y].value)
      }
    }
  }
}