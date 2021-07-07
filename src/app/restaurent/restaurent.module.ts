import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurentComponent } from './restaurent.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RestaurentDialogComponent } from './restaurent-dialog/restaurent-dialog.component';
const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Restaurent',
			urls: [
				{ title: 'Restaurent', url: '/restaurents' }			
			]
		},
		component: RestaurentComponent
	}
];

@NgModule({
	imports: [
		FormsModule, 
		CommonModule, 
		RouterModule.forChild(routes), 
		AngularMaterialModule
	],
	declarations: [
		RestaurentComponent, 
		RestaurentDialogComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurentModule {}
