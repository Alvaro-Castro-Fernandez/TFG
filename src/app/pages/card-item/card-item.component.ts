import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {
  cards = [
    { name: 'Producto 1', price: ' 1€' },
    { name: 'Producto 2', price: ' 2€' },
    { name: 'Producto 3', price: ' 3€' },
    { name: 'Producto 4', price: ' 4€' },
    { name: 'Producto 5', price: ' 5€' },
    { name: 'Producto 6', price: ' 6€' },
    { name: 'Producto 7', price: ' 7€' },
    { name: 'Producto 8', price: ' 8€' },
    { name: 'Producto 9', price: ' 9€' },
    { name: 'Producto 10', price: ' 10€' }
  ];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  categotyControl = new FormControl('');
  filteredCategories!: Observable<string[]>;
  categories: string[] = ['Todo'];
  allCategories: string[] = ['Este array', 'Estara lleno', 'con todas las', 'categorias de los', 'productos en la bdd'];

  @ViewChild('categoryInput')
  arrInput!: ElementRef<HTMLInputElement>;
  obs!: Observable<any>;

  constructor() {
    this.filteredCategories = this.categotyControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allCategories.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
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


