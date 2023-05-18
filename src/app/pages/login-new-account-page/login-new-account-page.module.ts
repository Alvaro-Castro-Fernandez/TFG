import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginNewAccountPageRoutingModule } from './login-new-account-page-routing.module';
import { LoginNewAccountPageComponent } from './login-new-account-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
<<<<<<< HEAD
import {MatButtonModule} from '@angular/material/button';

=======
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3


@NgModule({
  declarations: [
    LoginNewAccountPageComponent
  ],
  imports: [
    CommonModule,
    LoginNewAccountPageRoutingModule,
    MatInputModule,
    MatCardModule,
<<<<<<< HEAD
    MatDividerModule,
    MatButtonModule
=======
    MatDividerModule
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3
  ]
})
export class LoginNewAccountPageModule { }
