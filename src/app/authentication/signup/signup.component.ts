import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupRequestPayload} from './signup-request.payload';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupRequestPayload: SignupRequestPayload;

  constructor(private authService: AuthService) {
    this.signupRequestPayload = {
      login: '',
      password: '',
      email: '',
      city: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', Validators.required)
    });
  }

  signup(): void {
    this.signupRequestPayload.login = this.signupForm.get('login').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.city = this.signupForm.get('city').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        console.log(data);
      });
  }
}
