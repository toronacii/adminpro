import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraphComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
})
export class PagesModule { }
