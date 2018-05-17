import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate() {
    let isLogged = this.userService.isLogged();

    if (!isLogged) {
      this.router.navigate([ '/login' ]);
    }
    return isLogged;
  }
}
