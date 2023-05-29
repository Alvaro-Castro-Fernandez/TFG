import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginNewAccountPageRoutingModule } from './login-new-account-page-routing.module';
import { LoginNewAccountPageComponent } from './login-new-account-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LoginNewAccountPageComponent
  ],
  imports: [
    CommonModule,
    LoginNewAccountPageRoutingModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class LoginNewAccountPageModule { }
