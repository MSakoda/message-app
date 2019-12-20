import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { LikeService } from '../../../services/like.service';
import { Comment } from '../../../models/Comment';
import { User } from '../../../models/User';
import * as moment from 'moment';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  user: User;
  moment: any = moment;

  constructor(public userService: UserService, public likeService: LikeService) { }

  ngOnInit() {
    this.user = this.userService.getUserById(this.comment.u_id);
  }
}
