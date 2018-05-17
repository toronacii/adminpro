import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import { tap, map } from 'rxjs/operators';

import { API } from './../../config';
import { User } from '../../models/user.model';

const USER_URL = `${ API }/users`;
const LOGIN_URL = `${ API }/login`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private get user(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
  private get token() {
    return localStorage.getItem('token');
  }

  constructor(
    private http: HttpClient
    private router: Router
  ) {}

  login(user: User, rememberMe = false) {

    if (rememberMe) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http
      .post(LOGIN_URL, user)
      .pipe(
        tap(this.saveSession),
        map(_ => true)
      );
  }

  googleLogin(token) {
    return this.http
      .post(`${ LOGIN_URL }/google`, { token })
      .pipe(
        tap(this.saveSession),
        map(_ => true)
      );
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate([ '/login' ]);
  }

  create(user: User) {
    return this.http
      .post(USER_URL, user)
      .pipe(
        tap(() => swal('User Created', user.email, 'success'))
      );
  }

  isLogged() {
    return !!this.token;
  }

  private saveSession({ user, token }) {
    localStorage.setItem('id', user._id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
