import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../_services/api.service';

export interface UsersData {
	name: string;
	id: number;
}

export interface IThemeForm {
	pos_rest_id ?: string;
	isDefault ?: boolean;
	theme ?: object;
	homepage ?: object;
}

@Component({
	selector: 'app-restaurent-dialog',
	templateUrl: './restaurent-dialog.component.html',
	styleUrls: ['./restaurent-dialog.component.css']
})
export class RestaurentDialogComponent implements OnInit {

	action: string;
	local_data: any;
	restaurant_list: any = [];
	addForm: any = {};
	editForm: any = {};
	themeForm: IThemeForm = {};
	themeObject: any = {};
	homepageObject: any = {};
	restaurantName: string = ''; deleteId: any = '';
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
		this.local_data = data;
		this.action = this.local_data.action;
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
		this.dialogRef.close({ event: this.action, data: this.local_data });
	}

	closeDialog() {
		this.dialogRef.close({ event: 'Cancel' });
	}

	onOptionsSelected(event: any) {
		  this.addForm={};
		  const value = event.target.value;
		  let name, address, email, phone;
		  this.pos_restaurant_list.filter(function(item :any){
		   if(item._id === value)
		   {
		    console.log("item..............",item);
		   //  this.addForm.pos_rest_id = value; 
		  // this.addForm['name'] = item.name;
		    phone = item.phone;
		    email = item.email;
		    address = item.address;
		    name= item.name;
		   }
		});
		this.addForm.name = name;
		this.addForm.mobile = phone;
		this.addForm.email = email;
		this.addForm.address = address;
		this.addForm.pos_rest_id =  event.target.value;
		this.editForm.pos_rest_id =  event.target.value;
		this.themeObject.pos_rest_id = event.target.value;
		this.homepageObject.pos_rest_id = event.target.value;
		console.log(this.addForm);
	}

	onAddRestaurant() {
		console.log("add...........", this.addForm)
		this.apiService.ADD_RESTAURANT(this.addForm).subscribe(result => {
			if (result.status) {
				this.ngOnInit();
				// this.closeDialog();
				this.onAddTheme();
			}
			else {
				this.addForm.error_msg = result.message;
			}
		});
	}


	onUpdateRestaurant() {
		this.apiService.UPDATE_RESTAURANT(this.editForm).subscribe(result => {
			if (result.status) {
				this.closeDialog();
				this.ngOnInit();
			}
			else {
				this.editForm.error_msg = result.message;
			}
		});
	}

	onDeleteRestaurant() {
		this.apiService.DELETE_RESTAURANT({ '_id': this.deleteId }).subscribe(result => {
			if (result.status) {
				this.closeDialog();
				this.ngOnInit();
			}
		});
	}

	onAddTheme() {
		// default Theme added to restaurent
		// this.themeObject.pos_rest_id = this.addForm.pos_rest_id;
		// this.themeObject.navbarColor = '#232323';
		// this.themeObject.navbarText = '#fff';
		// this.themeObject.primaryButtonColor = '#69499b';
		// this.themeObject.primaryButtonText = '#fff';
		// this.themeObject.secondaryButtonColor = '#ffcf34';
		// this.themeObject.secondaryButtonText = '#fff';
		// this.themeObject.disabledButtonColor = '#616161';
		// this.themeObject.disabledButtonText = '#fff';
		// this.themeObject.spinnerColor = '#232323';
		// this.themeObject.isDefaultTheme = true;

		// default Homepage properties added to restaurent
		// this.homepageObject.pos_rest_id = this.addForm.pos_rest_id;
		// this.homepageObject.header = 'Welcome';
		// this.homepageObject.subHeader = 'Start by selecting your desired option';
		// this.homepageObject.headerStatus = true;
		// this.homepageObject.billHeader = 'View Bill';
		// this.homepageObject.billSubheader = 'No orders placed';
		// this.homepageObject.billImage = '';
		// this.homepageObject.billHeaderStatus = true;
		// this.homepageObject.helpHeader = 'Need Help?';
		// this.homepageObject.helpSubheader = 'Call a Waiter';
		// this.homepageObject.helpImage = '';
		// this.homepageObject.helpStatus = true;
		// this.homepageObject.vehicleHeader = 'Call for Vehicle';
		// this.homepageObject.vehicleSubheader = 'Valet Parking';
		// this.homepageObject.vehicleImage = '';
		// this.homepageObject.vehicleStatus = true;
		// this.homepageObject.offerHeader = 'View Offers';
		// this.homepageObject.offerSubheader = 'No offers available';
		// this.homepageObject.offerImage = '';
		// this.homepageObject.offerStatus = true;
		// this.homepageObject.exitHeader = 'Exit';
		// this.homepageObject.exitSubheader = 'Scan again';
		// this.homepageObject.exitImage = '';
		// this.homepageObject.exitStatus = true;
		// this.homepageObject.isDefaultHomepage = true;
		
		this.themeForm = {
			'isDefault' : true,
			'pos_rest_id': this.themeObject.pos_rest_id,
			'theme': this.themeObject,
			'homepage': this.homepageObject,
		}
		console.log('created object', this.themeForm);
		this.apiService.ADD_THEME(this.themeForm).subscribe((result) => {
			if (result.status) {
				this.closeDialog();
			} else {
				this.themeObject.error_msg = result.message;
			}
		});

	}

}
