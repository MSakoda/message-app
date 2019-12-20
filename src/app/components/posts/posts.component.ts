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

  sorting: any = {
    'type' : '',
    'direction' : ''
  }

  moment: any = moment;

  constructor(public service: PostService, public userService: UserService, public likeService: LikeService) { }

  ngOnInit() {
  }

  onClickNewPost(){
    this.service.showNewPost = true;
  }

  sortPosts(type){
    // check if something is being sorted already
    if (this.sorting.type == type) {
      // flip it
      this.sorting.direction = this.sorting.direction == "desc" ? 'asc' : 'desc';
    } else {
      this.sorting.type = type;
      this.sorting.direction = 'desc';
    }
    let dirVal = this.sorting.direction == 'desc' ? 1 : -1;
    if (type == 'title') {
      this.service.posts.sort((a,b) => a.title.toLowerCase() > b.title.toLowerCase() ? dirVal : -dirVal);
    }
    if (type == "author") {
      this.service.posts.sort((a,b) => {
        return this.userService.getUserById(a.u_id).username.toLowerCase() > this.userService.getUserById(b.u_id).username.toLowerCase() ? dirVal : -dirVal;
      })
    }
    if (type == "created") {
      this.service.posts.sort((a,b) => {
        return this.moment(a.c_at) > this.moment(b.c_at) ? dirVal : -dirVal;
      });
    }
    if (type == "points") {
      this.service.posts.sort((a,b) => {
        let aLikes = this.likeService.likes.filter(l => l.t_id == a.id);
        let bLikes = this.likeService.likes.filter(l => l.t_id == b.id);
        return (aLikes && aLikes.length || 0) > (bLikes && bLikes.length || 0) ? dirVal : -dirVal;
      });
    }
  }

  getSortIcon(type) {
    return {
      'fa-sort': this.sorting.type != type || this.sorting.direction == '',
      'fa-sort-up': this.sorting.type == type && this.sorting.direction == 'asc',
      'fa-sort-down': this.sorting.type == type && this.sorting.direction == 'desc'
    }
  }

}
