import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    exports: [
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent
    ]
})
export class SharedModule { }
