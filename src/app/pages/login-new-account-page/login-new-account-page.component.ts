import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-login-new-account-page',
  templateUrl: './login-new-account-page.component.html',
  styleUrls: ['./login-new-account-page.component.css']
})
export class LoginNewAccountPageComponent implements OnInit {

  hideRP: boolean = true
  hideP: boolean = true
  account!: FormGroup;
  comparator: any
  accData: any

  constructor(
    private authS: AuthService,
    private ds: DocumentService,
    private router: Router
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

  async checkIfExist() {
    this.comparator = await this.ds.getByAttrr("/accounts", "email", this.account.get("email")?.value);
    if (this.comparator === undefined) {
      this.submitForm();
    } else {
      this.account.reset();
    }
  }

  submitForm() {
    if (this.account.get("password")!.value === this.account.get("repeatPassword")!.value) {
      this.authS.createNewUser({ email: this.account.get("email")?.value, password: this.account.get("password")?.value })
        .then(async data => {
          this.accData = await this.ds.create("/accounts", { ...this.account.value, id: data.user.uid })
          console.log(this.accData);
          this.router.navigate(["/main"]);
        })
        .catch(error => console.log(error))
    } else {
      this.account.reset()
    }
  }

  ngOnInit() {

  }

}
