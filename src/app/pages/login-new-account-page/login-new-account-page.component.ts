import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-login-new-account-page',
  templateUrl: './login-new-account-page.component.html',
  styleUrls: ['./login-new-account-page.component.css']
})
export class LoginNewAccountPageComponent implements OnInit {

  hideRP:boolean = true
  hideP:boolean = true
  account!: FormGroup;

  constructor(
    private authS: AuthService,
    private ds: DocumentService,
    private router : Router
  ) {
    this.account = new FormGroup({
      password: new FormControl(''),
      email: new FormControl(''),
      repeatPassword: new FormControl(''),
      name: new FormControl(''),
      lastName: new FormControl(''),
      city: new FormControl(''),
      district: new FormControl(''),
      postalCode: new FormControl(''),
      adress: new FormControl(''),
      iAgree: new FormControl(''),
    });
  }

  unsubmit(event: Event) {
    event.preventDefault();
  }
  onSubmit() {
    if (this.account.get("password")!.value === this.account.get("repeatPassword")!.value) {
      this.authS.createNewUser({ email: this.account.get("email")!.value, password: this.account.get("password")!.value })
        .then(async response => {
          console.log("Creando cuenta...");
          await this.ds.create('/accounts', this.account.value)
          console.log("Cuenta creada con exito.");
          this.router.navigate(['/main']);
        })
        .catch(error => console.log(error))
    } else {
      // Las contraseñas no coinciden (Deberia borrar los imputs de las contraseñas o borrar el formulario entero?)
    }
  }

  ngOnInit() {

  }

}
