import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  showPost: boolean = false;
  posts: Post[] = [];
  post: Post;

  showNewPost: boolean = false;


  constructor(public userService: UserService) {
    if (window.localStorage.posts == undefined) {
      window.localStorage.posts = JSON.stringify([]);
    }
    this.getPosts();
    if (window.localStorage.selectedPost && window.localStorage.selectedPost != "") {
      this.viewPost(window.localStorage.selectedPost);
    }

    this.userService.logoutChange.subscribe((res: any) => {
      window.localStorage.selectedPost = '';
      this.post = null;
      this.showPost = false;
    })
  }

  createPost(title, body){
    let newPost: Post = {
      title: title,
      body: body,
      id: UUID.UUID(),
      u_id: this.userService.user.id,
      c_at: new Date,
      u_at: new Date
    }
    this.posts.push(newPost);
    this.updatePosts();
  }

  editPost() {

  }

  deletePost(id) {

  }

  getPosts(){
    this.posts = JSON.parse(window.localStorage.posts);
    this.posts.sort((a,b) => {
      return a.c_at > b.c_at ? -1 : 1;
    })
  }

  getPostById(){

  }

  updatePosts(){
    window.localStorage.posts = JSON.stringify(this.posts);
  }

  validateNewPost(title,body){
    let error: any = {};
    let valid = true;
    if (title.trim() == "") {
      valid = false;
      error.title = "Title must not be empty";
    }
    if (body.trim() == "") {
      valid = false;
      error.body = "Post is empty";
    }
    return {
      valid: valid,
      error: error
    }
  }

  viewPost(p_id){
    let post = this.posts.find(p => p.id == p_id);
    console.log(`post:`,post);
    if (post) {
      this.post = post;
      window.localStorage.selectedPost = p_id;
      this.showPost = true;
    }
  }
}
