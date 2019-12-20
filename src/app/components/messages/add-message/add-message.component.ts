import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {

  @Input('postId') postId: string;

  error: boolean = false;
  errors: any = {};

  constructor(public service: MessageService) { }

  ngOnInit() {
  }

  onSubmitClick() {
    if (this.validateNewMessage()){
      this.service.createMessage(this.postId);
    }
  }

  validateNewMessage(){
    this.errors = {};
    this.error = false;
    let body = this.service.body.trim();
    console.log(`body:`,body);
    if (body.length == 0) {
      this.errors.length = "Message is empty";
      this.error = true;
    }
    return !this.error;
  }

  handleCancelClick(){
    this.service.messageSub.next({
      addMessage: 'hide'
    });
  }

}
