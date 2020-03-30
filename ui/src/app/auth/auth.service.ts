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

      if (userDetails && userDetails.id) {
        this.apiService.getDataById('users', userDetails.id)
          .toPromise()
          .then(res => { // Success
            // localStorage.setItem('token_details', JSON.stringify(res));
            resolve(true);
          }).catch(error => {
            reject(false);
          });
      } else {
        reject(false);
      }
    });
  }

}
