import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurentThemeComponent } from './restaurent-theme.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

const rest_theme_routes: Routes = [
  {
    path: '',
    data: {
      title: 'Restaurent Theme',
      urls: [
        { title: 'Restaurent Theme', url: '/restaurent-theme' }
      ]
    },
    component: RestaurentThemeComponent
  }
];

@NgModule({
  declarations: [RestaurentThemeComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(rest_theme_routes),
  ]
})
export class RestaurentThemeModule { }
