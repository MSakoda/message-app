import { Injectable } from '@angular/core';
import { Comment } from '../models/Comment';
import { UserService } from './user.service';
import { UUID } from 'angular2-uuid';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: Comment[] = [];
  commentSub: Subject<any> = new Subject();
  commentChange = this.commentSub.asObservable();

  constructor(public userService: UserService) {
    if (window.localStorage.comments == undefined) {
      window.localStorage.comments = JSON.stringify([]);
    }
    this.getComments();
  }

  createComment(body, message_id){
    console.log(`body:`,body, "user:",this.userService.user, "message_id:",message_id);
    let newComment = {
      id: UUID.UUID(),
      body: body.trim(),
      m_id: message_id,
      u_id: this.userService.user.id,
      c_at: new Date,
      u_at: new Date
    }
    this.comments.push(newComment);
    this.updateComments();
    // hide the add comment box
    this.commentSub.next({
      addComment : 'hide',
      messageId: message_id,
      getComments:message_id
    });
  }

  validateComment() {
  }

  getComments(){
    this.comments = JSON.parse(window.localStorage.comments);
  }

  getCommentsByMessageId(m_id){
    let comments = this.comments.filter(c => c.m_id == m_id);
    console.log(`comments:`,comments);
    return comments;
  }

  getCommentById(id){
    return this.comments.find(c => c.id == id);
  }

  updateComments(){
    window.localStorage.comments = JSON.stringify(this.comments);
  }

}
