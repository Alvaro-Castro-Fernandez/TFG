import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { OnSalesPageComponent } from './pages/on-sales-page/on-sales-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },

  { path: '', component: MainComponent },
  { path: 'onSales', component: OnSalesPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'shoppingList', component: ShoppingListComponent },
  { path: 'employeeMainPage', component: MainComponent },
  { path: 'shoppingManagement', component: MainComponent },
  { path: 'userProfile', component: MainComponent },
  { path: 'employeeProfile', component: MainComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
