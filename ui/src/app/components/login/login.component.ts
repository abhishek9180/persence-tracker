import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
//import { LocalStorage } from '@ngx-pwa/local-storage';

import { LoginBean } from '../../beans/login.bean';


import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFrom: LoginBean = new LoginBean();
  loading: boolean;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  validateUser() {
    this.loading = true;
    this.apiService.postData('login', this.loginFrom)
      .subscribe(res => {
        // localStorage.setItem("token_details", JSON.stringify(res));
        this.router.navigate(['../home']);
        this.loading = false;
      },
        err => {
          this.loading = false;
        });
  }
}
