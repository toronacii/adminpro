import { RouterModule, Route } from '@angular/router';

import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraphComponent } from './pages/graph/graph.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const appRoutes: Route[] = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graph', component: GraphComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
