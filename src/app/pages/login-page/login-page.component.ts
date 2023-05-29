import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  loginAccount!: FormGroup;
  hide: boolean = true;
  accountData: any;

  constructor(
    private route: Router,
    private authS: AuthService,
    private ds: DocumentService,
  ) {
    this.loginAccount = new FormGroup({
      password: new FormControl(''),
      email: new FormControl(''),
    })
  }

  ngOnInit(): void {
  }

  unsubmit(event: Event) {
    event.preventDefault()
  }

  createNewAccount() {
    this.route.navigate(['/login/newAccount'])
  }

  async onSubmit() {
    this.accountData = await this.ds.getByAttrr("/accounts","email",this.loginAccount.get("email")?.value)
    if(this.accountData.email === this.loginAccount.get("email")?.value){
      this.authS.loginAnExistingAccount({ email: this.loginAccount.get("email")!.value, password: this.loginAccount.get("password")!.value })
        .then(async response => {
          console.log("Creando cuenta...");
          await this.ds.create('/accounts', this.loginAccount.value)
          console.log("Cuenta creada con exito.");
          this.route.navigate(['/main']);
        })
    }
  }

  loginWithAGoogleAccount() {
    this.authS.loginWithGoogle()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);

      })
  }

}


