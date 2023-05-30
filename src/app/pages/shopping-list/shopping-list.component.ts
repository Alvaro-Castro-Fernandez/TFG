import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  cartItems = [
    { product: 'Camiseta', quantity: 2, price: 15 },
    { product: 'Pantalón', quantity: 1, price: 30 },
    { product: 'Zapatos', quantity: 1, price: 50 }
  ];


  displayedColumns: string[] = ['select','product', 'quantity', 'price'];

  dataSource = new MatTableDataSource<any>(this.cartItems); //array con los objetos de la tabla carrito
  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(
  ){
  }
}
