import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../_services/api.service';

export interface UsersData {
	name: string;
	id: number;
}

export interface IThemeForm {
	restaurantName?: string;
	restaurant_id?: string;
	pos_rest_id?: string;
	isDefault?: boolean;
	theme?: object;
	homepage?: object;
	quickHelp?: object;
	brokenImages?: object;
	dynamicThings?: object;
}

@Component({
	selector: 'app-restaurent-dialog',
	templateUrl: './restaurent-dialog.component.html',
	styleUrls: ['./restaurent-dialog.component.css']
})
export class RestaurentDialogComponent implements OnInit {

	local_data: any;
	restaurant_list: any = [];
	addForm: any = {};
	editForm: any = {};
	themeForm: IThemeForm = {};
	themeObject: any = {};
	homepageObject: any = {};
	quickHelpObject: any = {};
	brokenImageObject: any = {};
	dynamicThingsObject: any = {};
	deleteId: string = '';
	delete_pos_rest_id: string = '';
	pos_restaurant_list: any;
	formType: any;
	restData: any;
	tableName: any = '';

	constructor(
		public dialogRef: MatDialogRef<RestaurentDialogComponent>,
		//@Optional() is used to prevent error if no data is passed
		@Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
		public apiService: ApiService) {
		console.log('dialogData ', data);
		this.local_data = { ...data };
		this.formType = this.local_data.x;
	}
	ngOnInit(): void {

		this.addForm = {};
		this.formType = this.local_data.x;
		let x = this.local_data.y;
		if (this.formType === 'edit') {
			this.editForm._id = x._id;
			this.editForm.name = x.name;
			this.editForm.contact_person = x.contact_person;
			this.editForm.mobile = x.mobile;
			this.editForm.email = x.email;
			this.editForm.website = x.website;
			this.editForm.base_url = x.base_url;
		} else if (this.formType === 'delete') {
			this.deleteId = x._id;
			this.delete_pos_rest_id = x.pos_rest_id;
		}
		this.apiService.RESTAURANT_LIST().subscribe(result => {
			console.log("result data..........", result)
			if (result.status) {
				this.restaurant_list = result.data;

				this.apiService.POS_RESTAURANT_LIST().subscribe(result => {
					console.log("Pos Restaurent............", this.restaurant_list);

					if (result) {
						let a = this.restaurant_list;
						let b = result.companies_list;

						b = b.filter(function (item: any) {
							for (var i = 0, len = a.length; i < len; i++) {
								if (a[i].pos_rest_id == item._id) {
									return false;
								}
							}
							return true;
						});
						this.pos_restaurant_list = b
						console.log("result of ...................", this.pos_restaurant_list)
					}
				});
			}
		});
	}

	doAction() {
		this.dialogRef.close({ event: this.formType, data: this.local_data });
	}

	closeDialog() {
		this.dialogRef.close({ event: 'cancel' });
	}

	onOptionsSelected(event: any) {
		this.addForm = {};
		const value = event.target.value;
		let name, address, email, phone;
		this.pos_restaurant_list.filter(function (item: any) {
			if (item._id === value) {
				console.log("item..............", item);
				//  this.addForm.pos_rest_id = value; 
				// this.addForm['name'] = item.name;
				phone = item.phone;
				email = item.email;
				address = item.address;
				name = item.name;
			}
		});
		this.addForm.name = name;
		this.addForm.mobile = phone;
		this.addForm.email = email;
		this.addForm.address = address;
		this.addForm.pos_rest_id = event.target.value;
		this.editForm.pos_rest_id = event.target.value;
		this.themeObject.pos_rest_id = event.target.value;
		this.homepageObject.pos_rest_id = event.target.value;
		this.quickHelpObject.pos_rest_id = event.target.value;
		this.brokenImageObject.pos_rest_id = event.target.value;
		console.log(this.addForm);
	}

	onAddRestaurant() {
		console.log("add...........", this.addForm)
		this.apiService.ADD_RESTAURANT(this.addForm).subscribe(result => {
			console.log('result of rest added', result);
			console.log("typeof rest id", typeof result.data.restaurant_id);
			if (result.status && result.data) {
				// this.ngOnInit();
				this.onAddTheme(result.data);
			}
			else {
				this.addForm.error_msg = result.message;
			}
		});
	}


	onUpdateRestaurant() {
		this.apiService.UPDATE_RESTAURANT(this.editForm).subscribe(result => {
			console.log('rest update...', result)
			if (result.status) {
				this.doAction();
				// this.onAddTheme(result.data);
			}
			else {
				this.editForm.error_msg = result.message;
			}
		});
	}

	onDeleteRestaurant() {
		this.apiService.DELETE_RESTAURANT({ '_id': this.deleteId, 'pos_rest_id': this.delete_pos_rest_id }).subscribe(result => {
			console.log('delete result', result);
			if (result.status) {
				this.doAction();
			}
		});
	}

	onAddTheme(data: any) {
		this.themeObject.pos_rest_id = data.pos_rest_id;
		this.homepageObject.pos_rest_id = data.pos_rest_id;
		this.quickHelpObject.pos_rest_id = data.pos_rest_id;
		this.brokenImageObject.pos_rest_id = data.pos_rest_id;
		this.dynamicThingsObject.pos_rest_id = data.pos_rest_id;
		this.themeForm = {
			'isDefault': true,
			'restaurantName': this.addForm.name ? this.addForm.name : this.editForm.name,
			'restaurant_id' : data.restaurant_id,
			'pos_rest_id': data.pos_rest_id,
			'theme': this.themeObject,
			'homepage': this.homepageObject,
			'quickHelp': this.quickHelpObject,
			'brokenImages': this.brokenImageObject,
			'dynamicThings': this.dynamicThingsObject
		}
		console.log('themeform object', this.themeForm);
		this.apiService.ADD_THEME(this.themeForm).subscribe((result) => {
			console.log("add theme result ",result )
			if (result.status) {
				this.doAction();
			} else {
				this.themeObject.error_msg = result.message;
			}
		});
	}

}
