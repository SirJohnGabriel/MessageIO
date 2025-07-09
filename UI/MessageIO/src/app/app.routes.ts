import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './auth-guard';
import { Register } from './components/register/register';
import { Conversations } from './conversations/conversations';
import { Settings } from './settings/settings';

export const routes: Routes = [
    { path: '', component: App},
    { path: 'login', component: Login},
    { path: 'register', component: Register},
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    { path: 'conversations', component: Conversations, canActivate: [authGuard]},
    { path: 'settings', component: Settings, canActivate: [authGuard]},
];
