import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  title: string = '';
  body: string = '';

  errors: boolean = false;
  error: any = {};

  constructor(public service: PostService) { }

  ngOnInit() {
  }

  onClick(){
    let validate = this.service.validateNewPost(this.title,this.body);
    if (!validate.valid) {
      this.error = validate.error;
      this.errors = true;
    } else {
      this.error = {};
      this.errors = false;
      this.service.createPost(this.title,this.body);
      this.title = '';
      this.body = '';
      this.service.showNewPost = false;
    }
  }

}
