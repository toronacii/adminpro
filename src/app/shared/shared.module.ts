import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
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
