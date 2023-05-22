import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/card-item/card-item.module').then(m => m.CardItemModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/card-item/card-item.module').then(m => m.CardItemModule)
  },
  {
    path: 'main/:id',
    loadChildren: () => import('./pages/product-display/product-display.module').then(m => m.ProductDisplayModule)
  },
  {
    path: 'login/newAccount',
    loadChildren: () => import('./pages/login-new-account-page/login-new-account-page.module').then(m => m.LoginNewAccountPageModule)
  },
  {
    path: 'onSale',
    loadChildren: () => import('./pages/on-sales-page/on-sales-page.module').then(m => m.OnSalesPageModule)
  },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
