import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  saveProfile(form: NgForm) {
    if (form.valid) {
      let user: User = Object.assign({}, this.user, form.value);
      
      this.userService
        .update(user)
        .subscribe(userUpdated => {
          debugger;
        });
    }
  }

}
