import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { MessageService } from '../../../services/message.service';
import { LikeService } from '../../../services/like.service';
import * as moment from 'moment';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  moment: any = moment;
  showAddMessage: boolean = false;
  newMessage: string = '';
  postMessages = [];

  constructor(public service: PostService, public messageService: MessageService, public likeService: LikeService) {
  }

  ngOnInit() {
    console.log(`this.service.post:`,this.service.post);
    this.messageService.messageChange.subscribe((res: any) => {
      if (res.addMessage) {
        if (res.addMessage == "hide") {
          this.showAddMessage = false;
          this.getPostMessages();
        }
      }
    });
    this.getPostMessages();
  }

  onClickPosts(){
    this.service.post = null;
    window.localStorage.selectedPost = "";
    this.service.showPost = false;
  }

  onClickAddMessage() {
    this.showAddMessage = true;
  }

  getPostMessages(){
    this.postMessages = this.messageService.getMessagesByPostId(this.service.post.id);
  }

}
