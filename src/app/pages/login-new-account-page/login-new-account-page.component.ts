import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPageService } from 'src/app/services/login-page.service';

@Component({
  selector: 'app-login-new-account-page',
  templateUrl: './login-new-account-page.component.html',
  styleUrls: ['./login-new-account-page.component.css']
})
export class LoginNewAccountPageComponent{

  hideRP: boolean = true
  hideP: boolean = true
  account!: FormGroup;
  comparator: any

  constructor(
    private authS: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private lps: LoginPageService
  ) {
    this.account = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      adress: new FormControl('', Validators.required),
      iAgree: new FormControl('', Validators.required),
    });
  }

  async checkIfExist() {
    let comparator = await this.lps.checkIfEmailExist(this.account.get("email")?.value)
    if (comparator) {
      this.submitForm();
    } else {
      this.openSnackBar("El correo que has introducido ya esta en uso.", "Entendido");
      this.account.reset();
    }
  }

  submitForm() {
    if (this.account.get("password")!.value === this.account.get("repeatPassword")!.value) {
      this.authS.createNewUser({
        email: this.account.get("email")?.value,
        password: this.account.get("password")?.value,
        displayName: this.account.value.name + " " + this.account.value.lastName
      }).then(data => {
        this.lps.createNewAccountInDatabase({ ...this.account.value, id: data.user.uid })
        this.openSnackBar("Bienvenido :" + this.account.get("name")?.value, "Cerrar")
        this.router.navigate(["/main"]);
      })
        .catch(error => console.log(error))
    } else {
      this.account.reset()
    }
  }

  openSnackBar(args: string, action: string) {
    this.snackbar.open(args, action);
  }
}
