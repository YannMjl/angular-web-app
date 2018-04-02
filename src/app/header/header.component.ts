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

  @ViewChild('popup1') popup1: Popup;

  constructor(
    private popup: Popup,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {

    this.popup1.options = {
      header: 'Log Out',
      color: '#bfff00', // red, blue....
      // widthProsentage: 30, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: 'Log Out', // The text on your confirm button
      cancleBtnContent: 'Cancel', // the text on your cancel button
      // confirmBtnClass: 'btn btn-default', // your class for styling the confirm button
      // cancleBtnClass: 'btn btn-default', // you class for styling the cancel button
      animation: 'fadeInDown' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

    this.popup1.show(this.popup1.options);

  }

  ConfirmEventLogOff() {
    this.authService.logout();
    alert('loging out');
  }


}
