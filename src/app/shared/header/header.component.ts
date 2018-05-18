import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
