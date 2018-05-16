import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';

import { API } from './../../config';
import { User } from '../../models/user.model';

const USER_API = `${ API }/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  create(user: User) {
    return this.http
      .post(USER_API, user)
      .pipe(
        map(userCreated => {
          swal('User Created', user.email, 'success');
          return userCreated;
        })
      );
  }
}
