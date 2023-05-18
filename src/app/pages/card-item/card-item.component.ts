import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { EMPTY, Observable, firstValueFrom } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ProductInterface } from 'src/app/interfaces/products.interface';
import { DocumentService } from 'src/app/services/document.service';


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {

  products: any[] = [];
  displayProducts = [{}]
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categotyControl = new FormControl('');
  filteredCategories!: Observable<string[]>;
  categories: string[] = ['Todo'];
  allCategories: string[] = ['Este array', 'Estara lleno', 'con todas las', 'categorias de los', 'productos en la bdd'];

  @ViewChild('categoryInput')
  arrInput!: ElementRef<HTMLInputElement>;
  obs!: Observable<any>;

  constructor(
    private ds: DocumentService
  ) {
    this.getAllProducts()
    this.filteredCategories = this.categotyControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allCategories.slice())),
    );
  }

  async getAllProducts() {
    this.products = await firstValueFrom(this.ds.list('products'))
    this.displayProducts.push(this.products)
    console.log(this.displayProducts);
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.categories.push(value);
    }
    event.chipInput!.clear();
    this.categotyControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.categories.indexOf(fruit);
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.arrInput.nativeElement.value = '';
    this.categotyControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCategories.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}