import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { QRCodeModule } from 'angular2-qrcode';
import { AuthGuard } from '../_guards/auth.guard';
const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Tables',
			urls: [
				{ 
					title: 'Tables', 
					url: '/tables',
					back_url: '/restaurants/branches' 
				}			
			]
		},
		component: TablesComponent,
		canActivate: [AuthGuard]
	}
];


@NgModule({
  declarations: [TablesComponent, TableDialogComponent],
  imports: [
    FormsModule,  QRCodeModule,CommonModule, RouterModule.forChild(routes),AngularMaterialModule,
  ]
})
export class TablesModule { }
