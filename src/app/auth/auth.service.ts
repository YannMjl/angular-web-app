import { User } from './user';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router
  ) { }

  login(user: User) {
    if (user.userName === 'admin' && user.password === 'pass') { // {3}
      this.loggedIn.next(true);
      this.router.navigate(['/report']);
      console.log('login successfully ' + this.loggedIn);
    }else {
      this.loggedIn.next(false);
      console.log('worng password or username ' + this.loggedIn);
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
