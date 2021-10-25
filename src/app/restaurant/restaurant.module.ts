import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { restaurantComponent } from './restaurant.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { restaurantDialogComponent } from './restaurant-dialog/restaurant-dialog.component';
import { AuthGuard } from '../_guards/auth.guard';
const routes: Routes = [
	// {
	// 	path: '',
	// 	data: {
	// 		title: 'restaurant',
	// 		urls: [
	// 			{ title: 'restaurant', url: '/restaurants' }			
	// 		]
	// 	},
	// 	component: restaurantComponent
	// },
	{
		path: '', children: [
			{
				path: '',
				data: {
					title: 'Restaurant',
					urls: [
						{ 
							title: 'Restaurant', 
							url: '/restaurants',
							back_url: '/restaurants'
						}
					]
				}, 
				component: restaurantComponent,
				canActivate: [AuthGuard]
			},
			{
				path: 'restaurant-theme',
				loadChildren: () => import('../restaurant-theme/restaurant-theme.module').then(m => m.restaurantThemeModule)
			},
			{
				path: 'branches',
				loadChildren: () => import('../branches/branches.module').then(m => m.BranchesModule)
			},
			{
				path: 'tables',
				loadChildren: () => import('../tables/tables.module').then(m => m.TablesModule)
			},
			{
				path: 'valet-tokens',
				loadChildren: () => import('../valet/valet-tokens/valet-tokens.module').then(m => m.ValetTokensModule)
			},
			{
				path: 'valet-users',
				loadChildren: () => import('../valet/valet-users/valet-users.module').then(m => m.ValetUsersModule)
			},
		]
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
		restaurantComponent,
		restaurantDialogComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class restaurantModule { }
