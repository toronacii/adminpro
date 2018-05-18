import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SharedService,
  SettingsService,
  SidebarService,
  UserService,
  UploadFileService,
  ModalUploadImageService,
  LoginGuard
} from './';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    UploadFileService,
    ModalUploadImageService,
    LoginGuard
  ]
})
export class ServicesModule { }
