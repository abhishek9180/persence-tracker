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
    this.userForm.avtar = $event.target.files[0];
  }

  registerUser() {
    this.loading = true;
    const formData = new FormData();
    formData.append('firstName', this.userForm.firstName);
    formData.append('lastName', this.userForm.lastName);
    formData.append('email', this.userForm.email);
    formData.append('password', this.userForm.password);
    formData.append('avtar', this.userForm.avtar);
    this.apiService.postFormData('users', formData)
      .subscribe(res => {
        this.router.navigate(['../login']);
        this.loading = false;
      },
        err => {
          this.loading = false;
        });
  }

}
