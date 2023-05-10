import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountInterface } from '../../interfaces/account.interface'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('Credentials submitted:', loginForm.value);
    }
  }
}


