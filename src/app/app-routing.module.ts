import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { OnSalesPageComponent } from './pages/on-sales-page/on-sales-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { LoginNewAccountPageComponent } from './pages/login-new-account-page/login-new-account-page.component';

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
