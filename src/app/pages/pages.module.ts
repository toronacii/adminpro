import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphComponent,
        AccountSettingsComponent,
        ProfileComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraphComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        ComponentsModule,
        PipesModule,
        FormsModule
    ]
})
export class PagesModule { }
