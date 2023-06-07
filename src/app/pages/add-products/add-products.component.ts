import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { CardItemService } from 'src/app/services/card-item.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  newProduct!: FormGroup;

  selectedCategories: File[] = [];
  categories = new FormControl('');
  filteredCategories: Observable<string[]>;
  category: string[] = ['Ropa'];
  allCategories: string[] = ['Accesorio', 'Pantalones', 'Camisetas', 'Calzado', 'Gafas', 'Colgante', 'Sudaderas'];

  selectedSizes: File[] = [];
  sizes = new FormControl('');
  filteredSizes: Observable<string[]>;
  size: string[] = ['M'];
  allSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',];

  @ViewChild('CategoryInput') categoryInput!: ElementRef<HTMLInputElement>;
  @ViewChild('SizeInput') sizeInput!: ElementRef<HTMLInputElement>;

  constructor(
    private cis: CardItemService,
    private snackbar: MatSnackBar

  ) {
    this.newProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      categories: this.categories,
      size: this.sizes,
    });
    // Categories Initial
    this.filteredCategories = this.categories.valueChanges.pipe(
      startWith(null),
      map((category: string | null) =>
        (category ? this.filterCategories(category) : this.allCategories.slice())),
    );
    // Sizes Initial
    this.filteredSizes = this.sizes.valueChanges.pipe(
      startWith(null),
      map((size: string | null) =>
        (size ? this.filterSize(size) : this.allSizes.slice())),
    );
  }

  //===================================================================================
  // Category Chip Input
  //===================================================================================

  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.category.push(value);
    }
    event.chipInput!.clear();
    this.categories.setValue(null);
    console.log("add cat");

  }

  removeCategory(addCategory: string): void {
    const index = this.category.indexOf(addCategory);
    if (index >= 0) {
      this.category.splice(index, 1);
    }
    console.log("remove cat");
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    this.category.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categories.setValue(null);
    console.log("SELECTED==>" + this.category);

  }

  private filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log("filtrer cat");
    return this.allCategories.filter(data => data.toLowerCase().includes(filterValue));
  }

  //===================================================================================
  // Size Chip Input
  //===================================================================================

  addSize(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.size.push(value);
    }
    event.chipInput!.clear();
    this.sizes.setValue(null);
    console.log("add size");
  }

  removeSize(addSize: string): void {
    const index = this.size.indexOf(addSize);
    if (index >= 0) {
      this.size.splice(index, 1);
    }
    console.log("remove size");

  }

  selectedSize(event: MatAutocompleteSelectedEvent): void {
    this.size.push(event.option.viewValue);
    this.sizeInput.nativeElement.value = '';
    this.sizes.setValue(null);
    console.log("SELECTED==>" + this.size);
  }

  private filterSize(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log("filter size");
    return this.allSizes.filter(data => data.toLowerCase().includes(filterValue));

  }

  submitNewProduct() {
    if (this.newProduct.valid) {
      console.log(this.newProduct.value);
      console.log(this.category);
      console.log(this.size);
      let newProd = {
        name: this.newProduct.get("name")!.value,
        description: this.newProduct.get("description")!.value,
        stock: this.newProduct.get("stock")!.value,
        price: this.newProduct.get("price")!.value,
        categories: this.category,
        clotheSize: this.size,
        onSale: false,
        urlTo: "inprogress.png"
      }
      this.cis.addProduct(newProd);
      this.openSnackBar("Producto añadido a la base de datos con exito", "Aceptar");
    } else {
      this.openSnackBar("Algo ha salido mal, compruebe el formulario", "Cerrar");
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }
}
