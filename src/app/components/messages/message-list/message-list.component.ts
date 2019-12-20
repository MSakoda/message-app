import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/Message';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Input('postId') postId: string;
  @Input('messages') messages: Message[];

  constructor(public service: MessageService) { }

  ngOnInit() {
  }

}
