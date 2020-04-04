import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.checkLogin(url).pipe(map(res => { return res }));

  }

  checkLogin(url: string): Observable<boolean> {
    return from(this.authService.getLoggedInUser()
      .then(res => {
        this.router.navigate(['/home']);
        return false;
      }).catch(e => {
        return true;
      }));
  }
}
