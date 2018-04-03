import { Popup } from 'ng2-opd-popup';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'CloudRepo Clients Report';
  isLoggedIn$: Observable<boolean>;

  constructor(
    private popup: Popup,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {

    this.authService.logout();

  }

}
