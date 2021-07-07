import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesComponent } from './branches.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { BranchDialogComponent } from './branch-dialog/branch-dialog.component';
const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Branches',
			urls: [
				{ title: 'Branches', url: '/branches' }			
			]
		},
		component: BranchesComponent
	}
];

@NgModule({
  declarations: [BranchesComponent, BranchDialogComponent],
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),AngularMaterialModule
  ]
})
export class BranchesModule { }
