import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';


@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {

  loading = false;
  users?: User[];
  user: any;

  constructor(private userService: UserService) { }



          ngOnInit(): void {
                    this.loading = true;
                    this.userService.getAll().pipe(first()).subscribe(users => {
                              this.loading = false;
                              this.users =users;
                    })
          }
}
