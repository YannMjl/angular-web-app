import { User } from './user';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// define the constant url we would be post user creds details
const apiUrl = 'https://web-server-reports.herokuapp.com/login';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(user: User) {
    if (user.userName === 'admin' && user.password === 'pass') { // {3}
      this.loggedIn.next(true);
      this.router.navigate(['/report']);

      const formData = new FormData();
      formData.append('username', user.userName);
      formData.append('password', user.password);

      this.http
        .post(apiUrl, {username: user.userName, password: user.password})
        .map((res: Response) => console.log('see res in post api: ' + res.json()))
        .subscribe(
          success => {
            alert('file uploaded succeful');
          console.log('see res in post api: ' + success);

          },

          error => alert(error)
        );

        console.log('hi');

    }else {
      this.loggedIn.next(false);
      console.log('worng password or username');
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
