import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

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
    for (let i = 0; i < 5; i++) {
      this.activeUsersUI.push(this.activeUsers[i]);
    }
    console.log(this.activeUsersUI)
  }

}
