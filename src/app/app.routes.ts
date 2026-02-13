import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CallbackComponent } from './pages/callback/callback.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalendarComponent } from './pages/dashboard/calendar/calendar.component';
import { CalendarCreateComponent } from './pages/dashboard/calendar/create/calendar-create.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { UsersListComponent } from './pages/dashboard/users/users-list.component';

import { authGuard } from './auth-guard';
import { adminGuard } from './admin-guard';
import { CalendarHomeComponent } from './pages/dashboard/calendar/home/calendar-home.component';
import { CalendarEditComponent } from './pages/dashboard/calendar/edit/calendar-edit.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'calendar',
        component: CalendarComponent,
        children: [
          { path: '', component: CalendarHomeComponent }, // /dashboard/calendar
          { path: 'create', component: CalendarCreateComponent }, // /dashboard/calendar/create
          { path: ':id/edit', component: CalendarEditComponent }, // /dashboard/calendar/123/edit
          // { path: ':id/delete', component: CalendarDeleteComponent }, // /dashboard/calendar/123/delete
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
        canActivate: [adminGuard], // Solo Admin
      },
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full',
      },
    ],
  },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/callback', component: CallbackComponent },
  { path: '**', redirectTo: 'dashboard' },
];
