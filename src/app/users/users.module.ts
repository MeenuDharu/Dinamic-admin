import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthGuard } from '../_guards/auth.guard';

const user_routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
      urls: [
        { 
          title: 'Users', 
          url: '/users' 
        }
      ]
    },
    component: UsersComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(user_routes),
  ]
})
export class UsersModule { }
