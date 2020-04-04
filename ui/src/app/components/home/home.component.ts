import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserBean } from 'src/app/beans/user.bean';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails: UserBean;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  activeUsers = [
    {
      profileUrl: "../../../assets/images/login.png",
      name: "test"
    },
    {
      profileUrl: "../../../assets/images/login.png",
      name: "test"
    },
    {
      profileUrl: "../../../assets/images/login.png",
      name: "test"
    }
    , {
      profileUrl: "../../../assets/images/login.png",
      name: "test"
    },
    {
      profileUrl: "../../../assets/images/login.png",
      name: "test"
    },
    {
      profileUrl: "../../../assets/images/login.png",
      name: "test"
    },
    {
      profileUrl: "../../../assets/images/login.png",
      name: "test"
    },
    {
      profileUrl: "../../../assets/images/login.png",
      name: "test"
    }
  ];
  activeUsersUI = [];
  ngOnInit(): void {
    this.userDetails = this.getUserDetails();
    for (let i = 0; i < 5; i++) {
      this.activeUsersUI.push(this.activeUsers[i]);
    }
    console.log(this.activeUsersUI)
  }

  logoutUser() {
    this.apiService.getHead('logout').subscribe(res => {
      // logged out successfully
      localStorage.clear();
      this.router.navigate(['./login']);
    },
      error => {
        console.error(error);
      })
  }

  getUserDetails() {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      // set placeholder image
      if (!userDetails.avtar) {
        userDetails.avtar = '../../../assets/images/user-placeholder.png';
      }
      return userDetails;
    }
    catch (err) {
      console.error(err);
      localStorage.clear();
      // navigate to login
      this.router.navigate(['./login']);
    }
  }

}
