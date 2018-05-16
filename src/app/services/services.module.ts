import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SettingsService, SidebarService, UserService } from './';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService
  ]
})
export class ServicesModule { }
