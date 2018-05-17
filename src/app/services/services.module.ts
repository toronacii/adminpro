import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SettingsService, SidebarService, UserService, LoginGuard } from './';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuard
  ]
})
export class ServicesModule { }
