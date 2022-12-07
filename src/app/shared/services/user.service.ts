import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({ providedIn: 'root' })
export class UserService implements OnInit {
  username: string;
  url = 'api/users';
  _attempts: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
            this.addAttempts();
            this.checkTotalAttempts();


  }

  // Check Attempts over 4 attempts will block the user
  checkTotalAttempts(): boolean {
    const attempts = Number(localStorage.getItem('attempts'));

    if (!attempts) {
      return false;
    } else {
      if (attempts > 4) {
        return true;
      } else {
        return false;
      }
    }
  }
  // Store Attempts for every failed attempt
  addAttempts() {
    const attempts = localStorage.getItem('attempts');
    if (!attempts) {
      localStorage.setItem('attempts', '1');
    } else {
      const newAttempts = Number(attempts) + 1;
      localStorage.setItem('attempts', `${newAttempts}`);
    }
  }
  // Clear Local Store and reset cache
  resetLocalStore() {
       localStorage.clear();
       console.log('Cache Local Store Cleared');
  }
  // Store User Credentials in local cache
  storeLocalCredentials(username: string): void {
            const user = localStorage.setItem('username', username);
  }

  // Get User Details from local cache
  getLocalCredentials(params: string): Observable<any> {
       const routerparams = of(params);
       return routerparams.pipe(map((result) => (result = result)));
  }

  // Update User Details in local cache
  updateLocalCredentials() {
         const user = localStorage.getItem('username');

    if (user === this.username) {
         console.log('Username has not changed');
    } else {
         localStorage.setItem('username', this.username);
    }
  }

  //   saveObject() {
  //     localStorage.data20221025 = JSON.stringify(displayTable);
  //   }

  //   getObject() {
  //     JSON.parse(localStorage.data20221025);
  //   }
}
