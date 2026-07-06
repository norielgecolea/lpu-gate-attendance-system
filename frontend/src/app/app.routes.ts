import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Placeholder } from './pages/placeholder/placeholder';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'students', component: Placeholder, data: { title: 'Students' } },
      { path: 'attendance', component: Placeholder, data: { title: 'Attendance' } },
      {
        path: 'deleted-students',
        component: Placeholder,
        data: { title: 'Deleted Students' },
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
