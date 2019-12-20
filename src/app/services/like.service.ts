import { Injectable } from '@angular/core';
import { Like } from '../models/Like';
import { UserService } from './user.service'
import { PostService } from './post.service'
import { MessageService } from './message.service'
import { CommentService } from './comment.service'
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class LikeService {
  likes: Like[] = [];

  constructor(
    public userService: UserService,
    public postService: PostService,
    public messageService: MessageService,
    public commentService: CommentService
  ) {
    if (window.localStorage.likes == undefined) {
      window.localStorage.likes = "[]";
    }
    this.getLikes();
  }

  getLikes(){
    this.likes = JSON.parse(window.localStorage.likes);
  }

  createLike(type, t_id, u_id){
    let newLike: Like = {
      id: UUID.UUID(),
      type: type,
      t_id: t_id,
      u_id: u_id,
      c_at: new Date,
      u_at: new Date
    }
    this.likes.push(newLike);
    this.updateLikes();
  }

  deleteLike(like) {
    if (like != undefined) {
      let likeIndex = this.likes.indexOf(like);
      this.likes = [...this.likes.slice(0,likeIndex),...this.likes.slice(likeIndex+1)];
      this.updateLikes();
    }
  }

  updateLikes(){
    window.localStorage.likes = JSON.stringify(this.likes);
  }

  getLikesById(type,id) {
    let likesByType = this.likes.filter(l => l.type == type);
    let likesById = likesByType.filter(l => l.t_id == id);
    return likesById;
  }

  onLike(type, id){
    let liked = false;
    let likes = this.likes.filter(l => l.type == type && l.t_id == id);
    if (likes && likes.length > 0) {
      let like = likes.find(l => l.u_id == this.userService.user.id);
      if (like != undefined) {
        liked = true;
        this.deleteLike(like);
        return;
      }
    }
    this.createLike(type,id,this.userService.user.id);
    this.getLikes();
  }

  canLike(type,id){
    let typeService = type == "post" ? this.postService : type == "message" ? this.messageService : this.commentService;
    let thing = typeService[`${type}s`].find(t => t.id == id);
    return thing.u_id != this.userService.user.id;
  }

}
