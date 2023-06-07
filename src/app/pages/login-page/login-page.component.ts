import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackbar:MatSnackBar
  ) {
    this.loginAccount = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })
  }

  ngOnInit(): void {
  }

  createNewAccount() {
    this.route.navigate(['/login/newAccount'])
  }

  async onSubmit() {
    try {
      await this.authS.loginAnExistingAccount(this.loginAccount.get("email")!.value, this.loginAccount.get("password")!.value);
        console.log("Login exitoso.");
        this.route.navigate(['/main']);
        const user = await firstValueFrom(this.authS.user$);
        this.openSnackBar("Sesion iniciada. Bienvenido/a!","Cerrar")
    } catch (error) {
      this.openSnackBar("Los datos introducidos no coinciden","Cerrar")
      this.loginAccount.reset();
    }
  }

  loginWithAGoogleAccount() {
    this.authS.loginWithGoogle()
      .then(async value => {
        let fullName = value.user.displayName?.split(" ");
        console.log(value);
        await this.ds.create('/accounts', {
          id: value.user.uid,
          name: fullName![0],
          lastName: fullName![1] + " " + fullName![2],
          email: value.user.email,
        })
        this.openSnackBar("Sesion iniciada. Bienvenido/a!","Cerrar")
        this.route.navigate(['/main']);
      })
  }

  openSnackBar(args:string, action:string){
    this.snackbar.open(args,action);
  }

}



