import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { API } from './../../config';
import { User } from '../../models/user.model';
import { UploadFileService } from '../upload-file.service';

const USER_URL = `${ API }/users`;
const LOGIN_URL = `${ API }/login`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new Subject<User>();
  private tokenSource = new Subject<string>();

  public user$ = this.userSource.asObservable();
  public token$ = this.tokenSource.asObservable();

  public get user(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
  public get token() {
    return localStorage.getItem('token');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private uploadFileService: UploadFileService
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
        tap(this.saveSession.bind(this)),
        map(_ => true)
      );
  }

  googleLogin(token) {
    return this.http
      .post(`${ LOGIN_URL }/google`, { token })
      .pipe(
        tap(this.saveSession.bind(this)),
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
        tap(userUpdated => this.saveSession({ user: userUpdated, token: this.token }))
      );
  }

  saveAvatar(fileModel) {
    return this.uploadFileService
      .upload(`${ API }/upload/user/${ this.user._id }`, fileModel)
      .then(user => {
        this.saveSession({ user, token: this.token });
      });
  }

  isLogged() {
    return !!this.token;
  }

  private saveSession({ user, token }) {
    localStorage.setItem('id', user._id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.tokenSource.next(token);
    this.userSource.next(user);
  }
}
