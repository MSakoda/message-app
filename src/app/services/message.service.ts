import { Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { UserService } from './user.service';
import { UUID } from 'angular2-uuid';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  body: string = '';
  messageSub: Subject<any> = new Subject();
  messageChange = this.messageSub.asObservable();


  constructor(public userService: UserService) {
    if (window.localStorage.messages == undefined) {
      window.localStorage.messages = JSON.stringify([]);
    }
    this.getMessages();
  }

  createMessage(post_id){
    console.log(`body:`,this.body, "user:",this.userService.user, "post_id:",post_id);
    let newMessage = {
      id: UUID.UUID(),
      body: this.body.trim(),
      p_id: post_id,
      u_id: this.userService.user.id,
      c_at: new Date,
      u_at: new Date
    }
    this.messages.push(newMessage);
    this.updateMessages();
    this.body = '';
    // hide the add message box
    this.messageSub.next( { addMessage : 'hide' } );
  }

  validateMessage(body) {

  }

  getMessages(){
    this.messages = JSON.parse(window.localStorage.messages);
  }

  getMessagesByPostId(p_id){
    let messages = this.messages.filter(m => m.p_id == p_id);
    console.log(`messages:`,messages);
    return messages;
  }

  getMessageById(id){
    return this.messages.find(m => m.id == id);
  }

  updateMessages(){
    window.localStorage.messages = JSON.stringify(this.messages);
  }

}
