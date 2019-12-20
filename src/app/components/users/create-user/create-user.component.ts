import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  errors: boolean = false;
  error: string = '';

  constructor(public service: UserService) { }

  ngOnInit() {
  }

  onClick(){
    console.log(`clicked submit:`,this.service.username);
    let validate = this.service.validateNewUser(this.service.username);
    this.errors = false;
    if (validate.valid) {
      console.log(`valid user`);
      let user = this.service.createUser(this.service.username);
      this.service.username = '';
      this.service.loginUser(user);
      this.service.showRegister = false;
      this.service.user = user;
    } else {
      this.errors = true;
      console.log(`invalid user:`,validate.error);
      this.error = validate.error;
    }
  }

}
