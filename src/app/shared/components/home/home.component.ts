import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';

import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';


@Component({
       selector: 'home',
       templateUrl: 'home.component.html',
       styleUrls: ['home.component.scss'],
})

export class HomeComponent  implements OnInit {
       username: string | null;
       logs: string[] = [];

       constructor(private messages: MessageService,
                                      private route: ActivatedRoute,
                                      private userService: UserService) { } 
       
       ngOnInit() { 
              this.getusername()
              this.log(`${this.username}`);
              console.log(this.username);
       }
       getusername(): void  {
              this.route.paramMap.pipe(
                     switchMap((params: ParamMap) => this.userService.getLocalCredentials(params.get('username')!))
              )
              if (this.username === null || undefined) {
                     this.username = 'Unknown username' 
              }
       }
       private log(message: string) {
              this.logs.push(message)
              this.messages.add(message)
       }
}

