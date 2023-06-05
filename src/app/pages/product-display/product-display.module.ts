import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDisplayRoutingModule } from './product-display-routing.module';
import { ProductDisplayComponent } from './product-display.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ProductDisplayComponent
  ],
  imports: [
    CommonModule,
    ProductDisplayRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class ProductDisplayModule { }
