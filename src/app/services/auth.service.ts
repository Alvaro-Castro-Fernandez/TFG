import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  createNewUser({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginAnExistingAccount({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logoutCurrentAccount() {
    return signOut(this.auth);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  theUserIsLogged() {
    return this.auth.currentUser !== null
  }

}
