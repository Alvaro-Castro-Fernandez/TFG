<<<<<<< HEAD
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
=======
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {
<<<<<<< HEAD
=======


  @ViewChild('categories') categories!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryControl = new FormControl('');
  filteredCategories: Observable<string[]>;
  mainCategory: string[] = ['Todo'];
  displayCategories: string[] = ['Ejemplo 1','Ejemplo 2','Ejemplo 3','Ejemplo 4','Ejemplo 5'];
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3
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
<<<<<<< HEAD

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
=======
  totalItems = this.cards.length;
  pageSize = 3;
  pageSizeOptions = [3, 5, 10];
  //LAS CATEGORIAS TIENEN QUE RECORRER UN ARRAY CON LOS DATOS QUE RECOJA DE LA BASE DE DATOS
  //Y DEBE ELIMINAR LAS OPCIONES REPETIDAS?

  constructor() {
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.displayCategories.slice())),
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
<<<<<<< HEAD
      this.categories.push(value);
    }
    event.chipInput!.clear();

    this.categotyControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.categories.indexOf(fruit);

    if (index >= 0) {
      this.categories.splice(index, 1);
=======
      this.mainCategory.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.categoryControl.setValue(null);
  }
  getParams(){

}

  remove(fruit: string): void {
    const index = this.mainCategory.indexOf(fruit);

    if (index >= 0) {
      this.mainCategory.splice(index, 1);
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
<<<<<<< HEAD
    this.categories.push(event.option.viewValue);
    this.arrInput.nativeElement.value = '';
    this.categotyControl.setValue(null);
=======
    this.mainCategory.push(event.option.viewValue);
    this.categories.nativeElement.value = '';
    this.categoryControl.setValue(null);
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

<<<<<<< HEAD
    return this.allCategories.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}


=======
    return this.displayCategories.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}

>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3
