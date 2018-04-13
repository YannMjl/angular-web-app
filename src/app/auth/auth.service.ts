import { User } from './user';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private loginToken: string;
  private readonly loginEndpoint: string;
  private readonly storeKey = 'currentUser';
  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn() { return this.loggedIn.asObservable(); }

  private loginPostLoadingComplete = false;
  isLoginPostLoadign() { return this.loginPostLoadingComplete; }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    // set login api url post
    const endpoint = environment.apiUrl;
    this.loginEndpoint = endpoint + '/login';
  }

  loginAuthBackend(user: User) {

    console.log('in login post credetntials to backend');

    const formData = new FormData();
    formData.append('username', user.userName);
    formData.append('password', user.password);

    return this.http.post<{token: string}>(this.loginEndpoint, formData);
  }

  getLoginPostData(user: User) {
    this.loginAuthBackend(user)
        .finally(() => this.loginPostLoadingComplete = true)
        .subscribe(
          data => {
            const token = data.token;
            console.log('data retrun after post is: ' + token);

            // login successful if there's a jwt token in the response
            if (token) {
              this.loginToken = data.token;
              console.log('value of logintoken is: ' + this.loginToken);

              // set loogedIn to true to indicate successful login
              this.loggedIn.next(true);

              // store token in local storage to keep user logged in between page refreshes
              localStorage.setItem(this.storeKey, JSON.stringify({
                token: this.loginToken
              }));

              // go to reports list
              this.router.navigate(['/report']);
            } else {
              // set logintoken to null
              this.loginToken = null;
              // set loggedIn to false to indicate failed login
              this.loggedIn.next(false);
            }
          },
          error => {
            console.log('in lodin post error' + error);
          }
        );
  }

  getToken(): string {
    return this.loginToken;
  }

  isLoggedIn$$(): boolean {
    return this.loginToken !== null;
  }

  public isAuthenticated() {
    const token = localStorage.getItem(this.loginToken);
  }

  logout() {
    this.loginToken = null;
    this.loggedIn.next(false);
    localStorage.removeItem(this.storeKey);
    this.router.navigate(['/login']);
    console.log('in logout, logintoken value is : ' + this.loginToken);
  }
}
