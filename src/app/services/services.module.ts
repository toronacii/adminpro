import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SettingsService, SidebarService } from './';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SettingsService,
    SharedService,
    SidebarService
  ]
})
export class ServicesModule { }
