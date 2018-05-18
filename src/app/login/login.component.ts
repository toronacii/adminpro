import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services';
import { User } from '../models/user.model';

declare function load_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberMe = false;
  private auth2: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    load_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email) {
      this.rememberMe = true;
    }
  }

  login(form: NgForm) {
    if (form.valid) {
      let model = form.value;
      let user = new User(null, model.email, model.password);
      this.userService
        .login(user, model.rememberMe)
        .subscribe(() => this.router.navigate([ '/dashboard' ]));
    }
  }

  private googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '376107001502-f0aa4if84887717pmcsrvibf56c9i8e4.apps.googleusercontent.com',
        cookiepolicy: 'simple_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  private attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      let token = googleUser.getAuthResponse().id_token;
      this.userService
        .googleLogin(token)
        .subscribe(() => {
          this.router
          .navigate([ '/dashboard' ])
          .then(result => result && window.location.reload());
        });
    });
  }
}
