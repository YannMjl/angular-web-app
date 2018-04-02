import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
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

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private authService: AuthService) { }

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

  onSubmit() {
    if (this.myForm.valid) {
      this.authService.login(this.myForm.value);

      this.http
        .post(apiUrl, this.myForm)
        .map((res: Response) => res.json())
        .subscribe(
          success => {
            alert('file uploaded succeful');
          },

          error => alert(error)
        );
    }
    this.formSubmitAttempt = true;
    console.log('on submit action' );
  }

}
