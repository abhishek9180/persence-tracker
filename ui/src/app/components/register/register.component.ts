import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { UserBean } from '../../beans/user.bean';


import { ApiService } from '../../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: UserBean = new UserBean();
  loading: boolean;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  uploadFile($event) {
    console.log($event.target.files[0]); // outputs the first file
  }

  registerUser() {
    this.loading = true;
    this.apiService.postData('login', this.userForm)
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
