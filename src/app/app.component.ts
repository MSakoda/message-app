import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'message-app';

  showLanding: boolean;
  constructor(public userService: UserService) {
  }

  ngOnInit() {
    if (this.userService.user == undefined) {
      this.showLanding = true;
    }
  }
}
