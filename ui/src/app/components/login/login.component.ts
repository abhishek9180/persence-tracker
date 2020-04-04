import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { LocalStorage } from '@ngx-pwa/local-storage';

import { LoginBean } from '../../beans/login.bean';


import { ApiService } from '../../api.service';
import { UserBean } from 'src/app/beans/user.bean';

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
      .subscribe((user: UserBean) => {
        localStorage.setItem('userDetails', JSON.stringify(user));
        this.router.navigate(['../']);
        this.loading = false;
      },
        err => {
          this.loading = false;
        });
  }
}
