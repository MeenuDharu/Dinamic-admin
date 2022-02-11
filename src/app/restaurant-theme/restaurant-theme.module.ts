import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { restaurantThemeComponent } from './restaurant-theme.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthGuard } from '../_guards/auth.guard';

const rest_theme_routes: Routes = [
  {
    path: '',
    data: {
      title: 'Restaurant Theme',
      urls: [
        { 
          title: 'Restaurant Theme', 
          url: '/restaurant-theme',
          back_url: '/restaurants' 
        }
      ]
    },
    component: restaurantThemeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [restaurantThemeComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(rest_theme_routes),
  ]
})
export class restaurantThemeModule { }
