import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  formSubmitAttempt: boolean;

  constructor(private fb: FormBuilder) { }

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
      // this.authService.login(this.form.value); // {7}
    }
    this.formSubmitAttempt = true;             // {8}
  }

}
