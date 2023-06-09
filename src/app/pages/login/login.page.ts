import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  activeUser: any;
  constructor(private formBuilder: FormBuilder, private route: Router) {}

  ngOnInit() {
  }
  get email() {
    return this.LoginForm.get('email');
  }
  get password() {
    return this.LoginForm.get('password');
  }
submit(){}

  public login() {
    // get email and password values entered by the user
    const email = this.LoginForm.get('email')?.value;
    const password = this.LoginForm.get('password')?.value;

    // get registered users data from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // find a user with matching email and password
    const user = users.find((u: { email: string | null | undefined; password: string | null | undefined; }) => u.email === email && u.password === password);

    // if user is found, navigate to home page
    if (user) {
      // set the logged-in user as the active user
      localStorage.setItem('activeUser', JSON.stringify(user));
      this.activeUser = user;
      this.route.navigate(['/home']).then(() => {
        window.location.reload();
      });
    } else {
      alert('Invalid login credentials. Please try again.');
    }
  }


  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: 'Password must be of atleast 6 characters',
      },
    ],
  };

  LoginForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zAA-Z0-9._%-]+@[a-zAA-Z0-9.-]+.[a-zA-Z{2,4}$]'),
      ],
    ],
    password: [
      '',
       [
        Validators.required,
        Validators.minLength(6),
      ],
      ],
  });

  SignupPage() {
    this.route.navigate(['/signup']);
  }
  ForgotpasswordPage() {
    this.route.navigate(['/forgotpassword']);
  }
}


