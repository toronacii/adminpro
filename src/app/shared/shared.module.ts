import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PipesModule } from '../pipes/pipes.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PipesModule,
        FormsModule
    ],
    declarations: [
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent,
        UploadImageComponent
    ],
    exports: [
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent,
        UploadImageComponent
    ]
})
export class SharedModule { }
