import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  authState,
  updateProfile
} from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = authState(this.auth);
  user$ = this.user;

  constructor(private auth: Auth) { }
  

  async createNewUser({ email, password, displayName }: any) {
    const registrer = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = await firstValueFrom(this.user$);
    if (user) {
      await updateProfile(user, {displayName: displayName})
    }
    return registrer
  }

  /* loginAnExistingAccount({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
  } */

  loginAnExistingAccount(email: string, password: string) {
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
5