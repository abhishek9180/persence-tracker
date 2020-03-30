import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = environment.baseUrl;

  constructor(public http: HttpClient) { }

  authenticateUser(username: string, password: string): Observable<any>{
    let param = {
      "username": username,
      "password": password
      }
    return this.http.post(`${this.baseUrl}app_users/login`, param);
  }
}
