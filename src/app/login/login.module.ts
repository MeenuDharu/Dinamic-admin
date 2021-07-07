import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Login',
			urls: [
				{ title: 'Restaurent', url: '/login' }			
			]
		},
		component: LoginComponent
	}
];

@NgModule({
  declarations: [LoginComponent],
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
})
export class LoginModule { }
