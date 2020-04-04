import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.checkLogin(url).pipe(map(res => res));
  }

  checkLogin(url: string): Observable<boolean> {

    return from(this.authService.getLoggedInUser()
      .then(res => {
        return res;
      }).catch(e => {
        this.router.navigate(['/login']);
        return false;
      }));
  }
}
