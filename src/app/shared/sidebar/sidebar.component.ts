import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor(
    public sidebar: SidebarService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
