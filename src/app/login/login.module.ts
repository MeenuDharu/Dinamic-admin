import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from "../_guards/login.guard";

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Login',
			urls: [
				{ title: 'restaurant', url: '/login' }			
			]
		},
		component: LoginComponent,
		canActivate: [LoginGuard]
	}
];

@NgModule({
  declarations: [LoginComponent],
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
})
export class LoginModule { }
