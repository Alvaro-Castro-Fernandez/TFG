import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { EMPTY, Observable, firstValueFrom, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userData: any
  userId: string = ""
  isAdmin$: Observable<boolean> = EMPTY;
  isAdmin: boolean = false;

  constructor(
    private ds: DocumentService,
    private AuthS: AuthService,
    private route: Router,
    private auth: Auth
  ) {
    this.getUserData()
    this.currentUserIsLogged()
    this.checkIfIsAdmin()
  }

  async logout() {
    await this.AuthS.logoutCurrentAccount();
  }

  navigateToShoppingList() {
    this.route.navigate(["/shoppingList"])
  }

  navigateToDeliveries() {
    this.route.navigate(["/shopping-list"])
  }


  currentUserIsLogged() {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid
      return true;
    } else {
      return false;
    }
  }
  checkIfIsAdmin() {
    this.isAdmin$ = this.AuthS.isAdmin$.pipe(
      tap(isAdmin => {
        this.isAdmin = isAdmin;
      })
    )
    return this.AuthS.theUserIsLogged();
  }

  async getUserData() {
    if (this.auth.currentUser) {
      console.log(this.userId);
      this.userData = await firstValueFrom(this.ds.get("/accounts/" + this.auth.currentUser!.uid))
      console.log("asdasd" + this.userData);
    }

  }
}

