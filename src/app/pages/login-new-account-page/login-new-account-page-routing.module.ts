import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginNewAccountPageComponent } from './login-new-account-page.component';

const routes: Routes = [{ path: '', component: LoginNewAccountPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginNewAccountPageRoutingModule { }
