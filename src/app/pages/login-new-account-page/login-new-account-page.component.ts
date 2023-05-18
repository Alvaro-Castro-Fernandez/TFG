import { Component } from '@angular/core';

@Component({
  selector: 'app-login-new-account-page',
  templateUrl: './login-new-account-page.component.html',
  styleUrls: ['./login-new-account-page.component.css']
})
export class LoginNewAccountPageComponent {

  constructor(){

  }

  unsubmit(event: Event){
    event.preventDefault();
  }
  onSubmitForm(){
    //Verificar si todos los parametros no estan en la base de datos y reedirigir hacia el main y permitir acceder a 
    //Un boton con los datos del usuario
  }

}
