import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ValetUsersComponent } from './valet-users.component';
import { Routes, RouterModule } from "@angular/router";
import { ValetUsersDialogComponent } from './valet-users-dialog/valet-users-dialog.component';
import { AngularMaterialModule } from "../../angular-material/angular-material.module";

const valet_users_routes: Routes = [
  {
    path: '',
    data: {
      title: 'Valet-Users',
      urls: [
        { title: 'Valet-Users', url: '/valet-users' }
      ]
    },
    component: ValetUsersComponent
  }
];


@NgModule({
  declarations: [
    ValetUsersComponent,
    ValetUsersDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(valet_users_routes),
  ]
})
export class ValetUsersModule { }
