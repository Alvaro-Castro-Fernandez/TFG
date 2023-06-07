import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';

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
    path: 'shoppingList',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'adminViewPage',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/view-products/view-products.module').then(m => m.ViewProductsModule)
  },
  {
    path: 'adminAddProducts',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/add-products/add-products.module').then(m => m.AddProductsModule)
  },
  {
    path: 'view-products',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/view-products/view-products.module').then(m => m.ViewProductsModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
