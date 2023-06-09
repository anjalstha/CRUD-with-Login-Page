import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private formBuilder: FormBuilder, private route: Router, private alertController: AlertController) { }

  localStorage = window.localStorage;

submit(){}

public register() {
  let data = JSON.parse(localStorage.getItem('users') || '[]');
  let email = this.RegisterForm.get('email')?.value;

  if (data.some((user: { email: string | null | undefined; }) => user.email === email)) {
    alert('User with this email already exists. Try with different email address.');
    return;
  }

  const newUser = {
    "id": uuidv4(), // generate a unique ID for the new user
    "name": this.RegisterForm.get('name')?.value,
    "email": email,
    "password": this.RegisterForm.get('password')?.value,
  };

  data.push(newUser);
  localStorage.setItem('users', JSON.stringify(data));
  alert('User registered successfully');
  // this.route.navigate(['/login']);

   // Reload the page
   window.location.reload();
}

  ngOnInit() {

  }
  get name() {
    return this.RegisterForm.get('name');
  }
  get email() {
    return this.RegisterForm.get('email');
  }
  get password() {
    return this.RegisterForm.get('password');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Please enter your name' },
      { type: 'pattern', message: 'Please enter a valid name (letters and spaces only)' },
    ],
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

  RegisterForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
      ],
    ],
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
  LoginPage() {
    this.route.navigate(['/login']);
  }
}

