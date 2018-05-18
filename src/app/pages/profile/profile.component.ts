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
  file: File;
  tempImage: string;

  constructor(
    public userService: UserService
  ) {
    this.userService.user$.subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.user = this.userService.user;
  }

  saveProfile(form: NgForm) {
    if (form.valid) {
      let user: User = Object.assign({}, this.user, form.value);

      this.userService
        .update(user)
        .subscribe(() => swal('Guardado', 'exitosamente', 'success'));
    }
  }

  changeFile(file: File) {
    if (!file || !(file instanceof File)) {
      return;
    }

    if (!file.type.includes('image')) {
      swal('Only Images', 'are allowed', 'error');
      this.file = null;
      return;
    }

    this.file = file;
    this.getFileAsString(fileStr => this.tempImage = fileStr);
  }

  saveAvatar() {

    this.userService
      .saveAvatar({ image: this.file })
      .then(() => swal('Avatar', 'saved successfully', 'success'));
  }

  getFileAsString(callback) {
    let reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onloadend = () => callback(reader.result);
  }

}
