import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MessageService } from '../../../services/message.service';
import { CommentService } from '../../../services/comment.service';
import { LikeService } from '../../../services/like.service';
import { Message } from '../../../models/Message';
import { User } from '../../../models/User';
import * as moment from 'moment';


@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input('messageId') messageId: string;

  moment: any = moment;
  message: Message;
  author: User;

  comments = [];

  showAddComment: boolean = false;

  constructor(public service: MessageService, public userService: UserService, public commentService: CommentService, public likeService: LikeService) { }

  ngOnInit() {
    this.message = this.service.getMessageById(this.messageId);
    this.author = this.userService.getUserById(this.message.u_id);

    this.commentService.commentChange.subscribe((res: any) => {
      if (res.addComment) {
        if (res.addComment == "hide" && res.messageId == this.messageId) {
          this.showAddComment = false;
        }
      }
      if (res.getComments && res.getComments == this.message.id) {
        this.getComments();
      }
    })
    this.getComments();
  }

  onClickAddComment(){
    console.log(`clicked add comment button`);
  }

  getComments(){
    this.comments = this.commentService.getCommentsByMessageId(this.message.id);
  }


}
