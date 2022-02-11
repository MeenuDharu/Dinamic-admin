import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	loginForm: any = {};
	
	constructor(private router: Router, private apiService: ApiService) { }

	ngOnInit(): void {
		// localStorage.clear();
	}

	onSubmit() {
		this.apiService.ADMIN_LOGIN(this.loginForm).subscribe(result => {
			console.log("result.............")
			if (result.status) {
				localStorage.setItem('admin_token', result.token);
				this.router.navigate(['/restaurants']);
			}
			else {
				this.loginForm.error_msg = result.message;
			}
		});
	}

}
