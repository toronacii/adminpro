import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(): boolean {
    if (this.userService.user.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.userService.logout();
      return false;
    }
  }
}
