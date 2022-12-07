import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../services/message.service';

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
})
export class MessagesComponent implements OnInit {

  messages: any[] = [];
  constructor(public messageService: MessageService) {}

  ngOnInit() {}

  add(message: string) {
    this.messageService.add(message) // Add messages to the User Interface
  }


  clear()  {
    this.messageService.clear() // clear messages from the User Interface
  }
}
