import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { ResourcesBaseComponent } from '../resources-base.component';
import { UserService } from '../../services/user/user.service';
import { ModalUploadImageService } from '../../services';
import { User } from '../../models/user.model';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent extends ResourcesBaseComponent<User> implements OnInit {

  get users() {
    return this.items;
  }

  constructor(
    userService: UserService,
    modalUploadImageService: ModalUploadImageService
  ) {
    super(userService, modalUploadImageService);
  }

  ngOnInit() {
    this.load();
  }

  delete(user: User) {
    super.delete(user, `You will delete to ${ user.name }`);
  }

  openUploadImageModal(user: User) {
    super.openUploadImageModal({ type: 'user', id: user._id, img: user.avatar });
  }
}
