import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = environment.baseUrl;

  constructor(public http: HttpClient) { }

  postData(apiName: string, body: any): Observable<any> {
    return this.http.post(this.baseUrl + apiName, JSON.stringify(body));
  }

  postFormData(apiName: string, body: any): Observable<any> {
    return this.http.post(this.baseUrl + apiName, body);
  }

  getData(apiName: string): Observable<any> {
    return this.http.get(this.baseUrl + apiName);
  }

  getDataById(apiName: string, id: number): Observable<any> {
    return this.http.get(this.baseUrl + apiName + '/' + id);
  }

  getHead(apiName: string): Observable<any> {
    return this.http.head(this.baseUrl + apiName);
  }
}
