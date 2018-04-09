import { Popup } from 'ng2-opd-popup';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// define the constant url we would be post user creds details
const apiUrl = 'https://web-server-reports.herokuapp.com/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  formSubmitAttempt: boolean;
  title = 'CloudRepo Clients Report';

  @ViewChild('popupLogIn') popupLogin: Popup;

  constructor(
    private popup: Popup,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.myForm.get(field).valid && this.myForm.get(field).touched) ||
      (this.myForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isAuthenticated() {
    this.popupLogin.options = {
      header: 'Access Denied',
      color: '#9f80ff', // red, blue....
      // widthProsentage: 30, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: 'Try Agin', // The text on your confirm button
      cancleBtnContent: 'close', // the text on your cancel button
      // confirmBtnClass: 'btn btn-default', // your class for styling the confirm button
      // cancleBtnClass: 'btn btn-default', // you class for styling the cancel button
      animation: 'fadeInDown' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };


    if (this.authService.isLoggedIn) {
      this.popupLogin.show(this.popupLogin.options);
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.authService.login(this.myForm.value);

      /*
      this.http
        .post(apiUrl, this.myForm.value)
        .subscribe(success => {
          alert('post login succeful');
        },
          error => { alert(error); }
      );
      */
    }
    this.formSubmitAttempt = true;

  }

  logInEvent() {
    this.popupLogin.hide();
    this.myForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
