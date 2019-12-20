import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { LikeService } from '../../services/like.service';
import * as moment from 'moment';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  moment: any = moment;

  constructor(public service: PostService, public userService: UserService, public likeService: LikeService) { }

  ngOnInit() {
  }

  onClickNewPost(){
    this.service.showNewPost = true;
  }

  canLikePost(post){
    let canLike = true;
    // can't like your own post
    if (this.userService.user.id == this.userService.getUserById(post.u_id).id) {
      canLike = false;
    }

    // can't like a post you've already liked
    // let postLikes = this.likeService.likes.filter(l => l.type == 'post' && l.t_id == post.id);
    // if (postLikes && postLikes.length > 0) {
    //   if (postLikes.find(l => l.u_id == this.userService.user.id)) {
    //     canLike = false;
    //   }
    // }
    return canLike;
  }

  onLike(postId){
    let liked = false;
    let postLikes = this.likeService.likes.filter(l => l.type == 'post' && l.t_id == postId);
    if (postLikes && postLikes.length > 0) {
      let like = postLikes.find(l => l.u_id == this.userService.user.id);
      if (like != undefined) {
        liked = true;
        this.likeService.deleteLike(like);
        return;
      }
    }
    this.likeService.createLike('post',postId,this.userService.user.id);
    this.likeService.getLikes();
  }

}
