import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, flatMap, catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { ApiService } from '../api.service';
import { UserBean } from '../beans/user.bean';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  redirectUrl: string;

  constructor(private apiService: ApiService) { }

  getLoggedInUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userDetails: UserBean = JSON.parse(localStorage.getItem('userDetails'));

      if (userDetails && userDetails._id) {
        this.apiService.getDataById('users', userDetails._id)
          .toPromise()
          .then((user: UserBean) => { // Success
            localStorage.setItem('userDetails', JSON.stringify(user));
            resolve(true);
          }).catch(error => {
            localStorage.clear();
            reject(false);
          });
      } else {
        localStorage.clear();
        reject(false);
      }
    });
  }

}
