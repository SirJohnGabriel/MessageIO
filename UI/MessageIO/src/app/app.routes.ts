import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './auth-guard';
import { Register } from './components/register/register';

export const routes: Routes = [
    { path: '', component: App},
    { path: 'login', component: Login},
    { path: 'register', component: Register},
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
];
