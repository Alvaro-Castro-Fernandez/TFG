import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
    constructor(public router: Router, public authS: AuthService) {

    }
    canActivate(
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.hasUser()) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
    hasUser(): boolean {
        if (this.authS.theUserIsLogged()) {
            return true;
        }
        return false;
    }

}