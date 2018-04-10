import { User } from './user';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { map } from 'rxjs/operators/map';

// define the constant url we would be post user creds details
const apiUrl = 'https://web-server-reports.herokuapp.com/login';
// const apiUrl = 'http://localhost:5000/login';

@Injectable()
export class AuthService {
  loginToken;
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(user: User) {
    if (user.userName === 'admin' && user.password === 'pass') {
      this.loggedIn.next(true);
      this.router.navigate(['/report']);

      const userCreds = new HttpParams()
                        .set('username', user.userName)
                        .set('password', user.password);

      const loginHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };

      /*
      this.http
        .post(apiUrl, { headers: { username: user.userName, password: user.password}})
        .subscribe(
          data => {
            console.log('data after login ' + data);
            this.router.navigate(['/home']);
          }
        );*/

        console.log('login token value is: ' + this.loginToken);

    }else {
      this.loggedIn.next(false);
      console.log('worng password or username');
    }
  }

  public isAuthenticated() {
    const token = localStorage.getItem(this.loginToken);
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
