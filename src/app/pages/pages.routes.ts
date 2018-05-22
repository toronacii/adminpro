import { Route, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphComponent } from './graph/graph.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuard } from '../services';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';

const pagesRoutes: Route[] = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
            { path: 'graph', component: GraphComponent, data: { title: 'Graphs' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
            { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },

            { path: 'users', component: UsersComponent, data: { title: 'Users' } },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
            { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
            { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctor' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
