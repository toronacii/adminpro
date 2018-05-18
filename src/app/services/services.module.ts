import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SharedService,
  SettingsService,
  SidebarService,
  UserService,
  UploadFileService,
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
    LoginGuard
  ]
})
export class ServicesModule { }
