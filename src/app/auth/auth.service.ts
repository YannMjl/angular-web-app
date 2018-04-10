import { User } from './user';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  private loginToken: string;
  private readonly loginEndpoint: string;
  private readonly storeKey = 'currentUser';
  private loggedIn = new BehaviorSubject<boolean>(false);

  formData = new FormData();

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    // set login api url post
    const endpoint = environment.apiUrl;
    this.loginEndpoint = endpoint + '/login';
  }

  login(user: User) {
    if (user.userName === 'admin' && user.password === 'pass') {
      this.loggedIn.next(true);
      this.router.navigate(['/report']);
    } else {
      this.loggedIn.next(false);
    }

    this.loginBackend(user);
  }

  loginBackend(user: User) {

    console.log('in login post');

    /*const userCreds = new HttpParams()
      .set('username', user.userName)
      .set('password', user.password);

    const loginHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };*/

    const formData = new FormData();
    formData.append('username', user.userName);
    formData.append('password', user.password);

    this.http/*.post(this.loginEndpoint, JSON.stringify({
                        username: user.userName, password: user.password}))*/
             .post<{token: string}>(this.loginEndpoint, formData)
             /*.map(data => {
               console.log('data value on post: ' + data.token);
               this.loginToken = data.token;
               console.log('value of token is: ' + this.loginToken);

               if (this.loginToken === 'false') {
                 // set loogedIn to false to indicate failed login
                 this.loggedIn.next(false);
                 console.log('worng password or username');
               } else {
                 // set loggedIn to true to indicate successful login
                 this.loggedIn.next(true);
                 this.router.navigate(['/report']);

                 // store token in local storage to keep user logged in between page refreshes
                 localStorage.setItem(this.storeKey, JSON.stringify({
                   token: this.loginToken
                 }));
               }

              }
            )*/
            .subscribe(
              data => {
                console.log('data value on post: ' + data.token);
                this.loginToken = data.token;
                console.log('value of token is: ' + this.loginToken);

                if (this.loginToken === 'false') {
                  // set loogedIn to false to indicate failed login
                  this.loggedIn.next(false);
                  console.log('worng password or username');
                } else {
                  // set loggedIn to true to indicate successful login
                  this.loggedIn.next(true);
                  this.router.navigate(['/report']);

                  // store token in local storage to keep user logged in between page refreshes
                  localStorage.setItem(this.storeKey, JSON.stringify({
                    token: this.loginToken
                  }));
                }

              },
              succes => {console.log(succes); }
            );
  }

  getToken(): string {
    return this.loginToken;
  }

  isLoggedIn$(): boolean {
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
    console.log('in logout, token value is : ' + this.loginToken);
  }

  get isLoggedIn() { return this.loggedIn.asObservable(); }
}
