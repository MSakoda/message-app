import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  errors: boolean = false;
  error: string = '';

  constructor(public service: UserService) { }

  ngOnInit() {
  }

  onClick(){
    this.errors = false;
    this.error = '';
    if (this.username.trim() == "") {
      this.errors = true;
      this.error = "Username is empty";
    } else {
      let user = this.service.getUserByUsername(this.username);
      console.log(`user:`,user);
      if (!user) {
        this.errors = true;
        this.error = "User does not exist";
      } else {
        this.service.user = user;
        this.service.loginUser(user);
        this.service.showLogin = false;
      }
    }
  }

}
