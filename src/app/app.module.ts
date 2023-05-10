import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardItemComponent } from './pages/card-item/card-item.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { OnSalesPageComponent } from './pages/on-sales-page/on-sales-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './pages/menu/menu.component';
import { MatCardModule } from '@angular/material/card';
import { MainComponent } from './pages/main/main.component';
import { EmployeeTableComponent } from './pages/employee-table/employee-table.component'
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    CardItemComponent,
    CategoriesComponent,
    ShoppingListComponent,
    OnSalesPageComponent,
    LoginPageComponent,
    MenuComponent,
    MainComponent,
    EmployeeTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
