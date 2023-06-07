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
import { BehaviorSubject, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdmin.asObservable();
  user = authState(this.auth);
  user$ = this.user;

  constructor(private auth: Auth) { 
    this.checkIfIsAdmin()
  }

  async checkIfIsAdmin() {
    const user = await firstValueFrom(this.user)
    if (user && user.uid === '2oL1ZjCBZrQJj04lAUC5mN0OTW82') {
      this.isAdmin.next(true);
    }
  }


  async createNewUser({ email, password, displayName }: any) {
    const registrer = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = await firstValueFrom(this.user$);
    if (user) {
      await updateProfile(user, { displayName: displayName })
    }
    return registrer
  }

  async loginAnExistingAccount(email: string, password: string) {
    const userData = await signInWithEmailAndPassword(this.auth, email, password)
    if (userData.user.uid === '2oL1ZjCBZrQJj04lAUC5mN0OTW82') {
      this.isAdmin.next(true);
    }
    return userData ;
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