import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDisplayComponent } from './product-display.component';

const routes: Routes = [{ path: '', component: ProductDisplayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDisplayRoutingModule { }
