import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import swal from 'sweetalert';

import { ResourceBaseService } from '../resource-base.service';
import { UploadFileService } from '../upload-file.service';
import { User } from '../../models/user.model';
import { API } from './../../config';


const USER_URL = `${ API }/users`;
const LOGIN_URL = `${ API }/login`;
const SEARCH_USERS_URL = `${ API }/search/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceBaseService<User> {
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
    http: HttpClient,
    private router: Router,
    private uploadFileService: UploadFileService
  ) {
    super(http, USER_URL, SEARCH_USERS_URL, () => this.token);
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
    return super.create(user)
      .pipe(
        tap(() => swal('User Created', user.email, 'success'))
      );
  }

  update(user: User) {
    return super.update(user)
      .pipe(
        tap((userUpdated: User) => {
          if (user._id === userUpdated._id) {
            this.saveSession({ user: userUpdated, token: this.token });
          }
          swal('User Updated', 'successfully', 'success');
        })
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
