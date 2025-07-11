import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './auth-guard';
import { Register } from './components/register/register';
import { Conversations } from './components/conversations/conversations';
import { Settings } from './components/settings/settings';
import { ForgotPassword } from './components/forgot-password/forgot-password';

export const routes: Routes = [
    { path: '', component: Login},
    { path: 'login', component: Login},
    { path: 'register', component: Register},
    { path: 'forgot-password', component: ForgotPassword},
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    { path: 'conversations', component: Conversations, canActivate: [authGuard]},
    { path: 'settings', component: Settings, canActivate: [authGuard]},
];
