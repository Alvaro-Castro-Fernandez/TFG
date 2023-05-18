import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AccountInterface } from '../../interfaces/account.interface'
import { Router } from '@angular/router';
<<<<<<< HEAD
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
=======
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3

@Component({
  selector: 'app-login-form',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
<<<<<<< HEAD
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  
=======

  email: string = '';
  password: string = '';

>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3
  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  
  unsubmit(event: Event) {
    event.preventDefault()
  }

  createNewAccount(){
    this.route.navigate(['/login/newAccount'])
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('Credentials submitted:', loginForm.value);
    }
  }
}


