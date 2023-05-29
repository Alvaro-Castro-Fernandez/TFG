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
    MatIconModule 
  ]
})
export class ProductDisplayModule { }
