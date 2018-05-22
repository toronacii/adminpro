import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SharedService,
  SettingsService,
  SidebarService,
  UploadFileService,
  ModalUploadImageService,
  LoginGuard,
  AdminGuard,
  UserService,
  HospitalService,
  DoctorService
} from './';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SettingsService,
    SharedService,
    SidebarService,
    UploadFileService,
    ModalUploadImageService,
    LoginGuard,
    AdminGuard,
    UserService,
    HospitalService,
    DoctorService
  ]
})
export class ServicesModule { }
