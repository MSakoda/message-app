import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Input() messageId: string;

  error: boolean = false;
  errors: any = {};
  body: string = '';

  constructor(public service: CommentService) { }

  ngOnInit() {
  }

  handleCancelClick(){
    this.body = '';
    this.service.commentSub.next( {
       addComment : 'hide',
       messageId: this.messageId
     } );
  }

  onSubmit(){
    if (this.validateComment()){
      this.service.createComment(this.body, this.messageId);
      this.handleCancelClick();
    }
  }

  validateComment() {
    this.error = false;
    this.errors = {};
    let body = this.body.trim();
    console.log(`body:`,body);
    if (body.length == 0) {
      this.error = true;
      this.errors.length = "Comment must not be empty.";
    }
    return !this.error;
  }

}
