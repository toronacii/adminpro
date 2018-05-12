import { Route, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphComponent } from './graph/graph.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

const pagesRoutes: Route[] = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graph', component: GraphComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
