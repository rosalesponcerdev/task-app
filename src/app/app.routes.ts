import { Routes } from '@angular/router';
import { loginGuard } from './guard/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/main/main.container').then((c) => c.MainContainer),
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.container').then((c) => c.LoginContainer),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
