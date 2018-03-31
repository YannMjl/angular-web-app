import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    }
    this.formSubmitAttempt = true;
  }

}
