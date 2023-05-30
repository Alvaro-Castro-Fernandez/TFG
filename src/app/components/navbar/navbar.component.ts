import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  constructor(
    private db: DocumentService,
    private AuthS: AuthService,
    private route: Router
  ) {

  }

  async logout(){
    await this.AuthS.logoutCurrentAccount();
  }

  navigateToShoppingList(){
    this.route.navigate(["/shoppingList"])
  }

  navigateToDeliveries(){
    this.route.navigate(["/shopping-list"])
  }

}
