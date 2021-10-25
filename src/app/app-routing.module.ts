import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';

export const Approutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
      // {
      //   path: 'component',
      //   loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      // },
      {
        path: 'restaurants',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.restaurantModule)
      },
      // {
      //   path: 'restaurant-theme',
      //   loadChildren: () => import('./restaurant-theme/restaurant-theme.module').then(m => m.restaurantThemeModule)
      // },
      // {
      //   path: 'branches',
      //   loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule)
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
      // },
      // {
      //   path: 'valet-tokens',
      //   loadChildren: () => import('./valet/valet-tokens/valet-tokens.module').then(m => m.ValetTokensModule)
      // },
      // {
      //   path: 'valet-users',
      //   loadChildren: () => import('./valet/valet-users/valet-users.module').then(m => m.ValetUsersModule)
      // },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      }
    ]
  },
  
  {
    path: '**',
    redirectTo: '/login'
  }
];
