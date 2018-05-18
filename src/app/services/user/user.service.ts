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
  public user: User;
  public token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadSession();
  }

  login(user: User, rememberMe = false) {

    if (rememberMe) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http
      .post(LOGIN_URL, user)
      .pipe(
        tap((credentials: any) => this.saveSession(credentials).loadSession()),
        map(_ => true)
      );
  }

  googleLogin(token) {
    return this.http
      .post(`${ LOGIN_URL }/google`, { token })
      .pipe(
        tap((credentials: any) => this.saveSession(credentials).loadSession()),
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

  update(user: User) {
    return this.http
      .put(`${ USER_URL }/${ user._id }?token=${ this.token }`, user)
      .pipe(
        tap(userUpdated => {
          this.saveSession({ user: userUpdated, token: this.token });
          this.user.name = user.name;
          this.user.email = user.email;
        })
      );
  }

  isLogged() {
    return !!this.token;
  }

  private saveSession({ user, token }) {
    localStorage.setItem('id', user._id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return this;
  }

  private loadSession() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.token = localStorage.getItem('token');
  }
}
