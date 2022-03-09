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
	instruction?: object;
	homePage?: object;
	quickHelp?: object;
	broken?: object;
	dynamicThings?: object;
}

@Component({
	selector: 'app-restaurant-dialog',
	templateUrl: './restaurant-dialog.component.html',
	styleUrls: ['./restaurant-dialog.component.css']
})
export class restaurantDialogComponent implements OnInit {

	local_data: any;
	restaurant_list: any = [];
	addForm: any = {};
	editForm: any = {};
	themeForm: IThemeForm = {};
	themeObject: any = {};
	instructionObject: any = {};
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
	dinamicSellout: boolean = false;
	box: boolean = false;

	constructor(
		public dialogRef: MatDialogRef<restaurantDialogComponent>,
		//@Optional() is used to prevent error if no data is passed
		@Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
		public apiService: ApiService
	) {
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
			this.editForm.sellout = x.sellout;
			x.sellout === 'active' ? this.dinamicSellout = true : this.dinamicSellout = false;
			x.box === 'active' ? this.box = true : this.box = false;
			console.log({x})
		} else if (this.formType === 'delete') {
			this.deleteId = x._id;
			this.delete_pos_rest_id = x.pos_rest_id;
		}
		this.apiService.RESTAURANT_LIST().subscribe(result => {
			console.log("result data..........", result)
			if (result.status) {
				this.restaurant_list = result.data;

				this.apiService.POS_RESTAURANT_LIST().subscribe(result => {
					console.log("Pos restaurant............", this.restaurant_list);

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
		this.instructionObject.pos_rest_id = event.target.value;
		this.homepageObject.pos_rest_id = event.target.value;
		this.quickHelpObject.pos_rest_id = event.target.value;
		this.brokenImageObject.pos_rest_id = event.target.value;
		console.log(this.addForm);
	}

	checkSellout(event: any, type: string) {
		if (type === 'add') {
			event.target.checked ?
				this.addForm.sellout = 'active' :
				this.addForm.sellout = 'inactive';
			console.log(this.addForm.sellout)
		} else if (type === 'edit') {
			event.target.checked ?
				this.editForm.sellout = 'active' :
				this.editForm.sellout = 'inactive';
			console.log(this.editForm.sellout)
		}
	}

	checkBox(event: any, type: string) {
		console.log(event, type);
		if (type === 'add') {
			event.target.checked ?
				this.addForm.box = 'active' :
				this.addForm.box = 'inactive';
			console.log(this.addForm.box)
		} else if (type === 'edit') {
			event.target.checked ?
				this.editForm.box = 'active' :
				this.editForm.box = 'inactive';
			console.log(this.editForm.box)
		}
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
				this.onAddTheme(result.data);
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
		new Promise((resolve, reject) => {
			this.apiService.GET_THEME_LIST({pos_rest_id: data.pos_rest_id}).subscribe((result: any) =>{
				if(result.status) {
					resolve(result.data);
				} else {
					reject('No Record Found');
				}
			});
		})	
		.then((themeList: any) => {
			console.log('promise data', themeList);
			this.themeObject.pos_rest_id = data.pos_rest_id;
			// this.instructionObject.pos_rest_id = data.pos_rest_id;
			let insTheme = themeList.instruction;
			this.instructionObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'instructionPage',
				data: {
					header: insTheme.data.header === '' || undefined ? 'Take a look, how to use' : insTheme.data.header,
					subHeader: 'Cool to use',
					headerStatus: true,
					card1_title: 'Title1',
					card1_desc: 'Description1',
					card1_status: true,
					card2_title: 'Title2',
					card2_desc: 'Description2',
					card2_status: true,
					card3_title: 'Title3',
					card3_desc: 'Description3',
					card3_status: true,
					card4_title: 'Title4',
					card4_desc: 'Description4',
					card4_status: true,
					card5_title: 'Title5',
					card5_desc: 'Description5',
					card5_status: true,
					card6_title: 'Title6',
					card6_desc: 'Description6',
					card6_status: true
				},
				imagePath: {
					card1_img: '/uploads/default/homepage/exitImage.svg',
					card2_img: '/uploads/default/homepage/helpImage.svg',
					card3_img: '/uploads/default/homepage/exitImage.svg',
					card4_img: '/uploads/default/homepage/helpImage.svg',
					card5_img: '/uploads/default/homepage/exitImage.svg',
					card6_img: '/uploads/default/homepage/helpImage.svg',
				}
			}
			this.homepageObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'homePage',
				data: {
					header: 'Welcome',
					subHeader: 'Start by selecting your desired option',
					headerStatus: true,
					billHeader: 'View Bill',
					billSubHeader: 'No orders placed',
					billStatus: true,
					helpHeader: 'Need Help?',
					helpSubHeader: 'Call a Waiter',
					helpStatus: true,
					vehicleHeader: 'Call for Vehicle',
					vehicleSubHeader: 'Valet Parking',
					vehicleStatus: true,
					offerHeader: 'View Offers',
					offerSubHeader: 'No offers available',
					offerStatus: true,
					exitHeader: 'Exit',
					exitSubHeader: 'Scan again',
					exitStatus: true,
				},
				imagePath: {
					bill_img: '/uploads/default/homepage/exitImage.svg',
					help_img: '/uploads/default/homepage/helpImage.svg',
					vehicle_img: '/uploads/default/homepage/exitImage.svg',
					offer_img: '/uploads/default/homepage/helpImage.svg',
					exit_img: '/uploads/default/homepage/exitImage.svg',
				}
			}
			this.quickHelpObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'quickHelp',
				data: {
					QH_mainMenuStatus: true,
					QH_billStatus: true,
					QH_waterStatus: true,
					QH_teaStatus: true,
					QH_waiterStatus: true,
					QH_wifiStatus: true,
					QH_essentialKitStatus: true,
					QH_tissueStatus: true,
				},
				imagePath: {
					QH_mainMenu_img: 'uploads/default/quickHelp/mainMenu.png',
					QH_bill_img: '/uploads/default/homepage/billImage.svg',
					QH_water_img: '/uploads/default/quickHelp/water.svg',
					QH_tea_img: '/uploads/default/quickHelp/tea.svg',
					QH_waiter_img: '/uploads/default/quickHelp/call waiter.svg',
					QH_wifi_img: '/uploads/default/quickHelp/wifi assistance.svg',
					QH_essentialKit_img: '/uploads/default/quickHelp/essential kit.svg',
					QH_tissue_img: '/uploads/default/quickHelp/tissue.svg'
				}
			}
			this.brokenImageObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'broken',
				data: {},
				imagePath: {
					brokenHomeBanner: '/uploads/default/brokenImages/brokenImage.png',
					brokenHomeCard: '/uploads/default/brokenImages/departCard.svg',
					brokenSectionCard: '/uploads/default/brokenImages/departCard.svg',
					brokenCatCard: '/uploads/default/brokenImages/list.svg',
					brokenLoaderLogo: '/uploads/default/brokenImages/dinamicLogo.svg',
				}
			}
			// this.homepageObject.pos_rest_id = data.pos_rest_id;
			// this.quickHelpObject.pos_rest_id = data.pos_rest_id;
			// this.brokenImageObject.pos_rest_id = data.pos_rest_id;
			this.dynamicThingsObject.pos_rest_id = data.pos_rest_id;
			this.themeForm = {
				'isDefault': true,
				'restaurantName': this.addForm.name ? this.addForm.name : this.editForm.name,
				'restaurant_id': data.restaurant_id,
				'pos_rest_id': data.pos_rest_id,
				'theme': this.themeObject,
				'instruction': this.instructionObject,
				'homePage': this.homepageObject,
				'quickHelp': this.quickHelpObject,
				'broken': this.brokenImageObject,
				'dynamicThings': this.dynamicThingsObject
			}
			console.log('themeform object', this.themeForm);
			this.apiService.ADD_THEME(this.themeForm).subscribe((result) => {
				console.log("add theme result ", result)
				if (result.status) {
					this.doAction();
				} else {
					this.themeObject.error_msg = result.message;
				}
			});
		})
		.catch((rejected) => {
			console.log('New data: ', rejected);
			this.themeObject.pos_rest_id = data.pos_rest_id;
			// this.instructionObject.pos_rest_id = data.pos_rest_id;
			this.instructionObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'instructionPage',
				data: {
					header: 'Take a look, how to use',
					subHeader: 'Cool to use',
					headerStatus: true,
					card1_title: 'Title1',
					card1_desc: 'Description1',
					card1_status: true,
					card2_title: 'Title2',
					card2_desc: 'Description2',
					card2_status: true,
					card3_title: 'Title3',
					card3_desc: 'Description3',
					card3_status: true,
					card4_title: 'Title4',
					card4_desc: 'Description4',
					card4_status: true,
					card5_title: 'Title5',
					card5_desc: 'Description5',
					card5_status: true,
					card6_title: 'Title6',
					card6_desc: 'Description6',
					card6_status: true
				},
				imagePath: {
					card1_img: '/uploads/default/homepage/exitImage.svg',
					card2_img: '/uploads/default/homepage/helpImage.svg',
					card3_img: '/uploads/default/homepage/exitImage.svg',
					card4_img: '/uploads/default/homepage/helpImage.svg',
					card5_img: '/uploads/default/homepage/exitImage.svg',
					card6_img: '/uploads/default/homepage/helpImage.svg',
				}
			}
			this.homepageObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'homePage',
				data: {
					header: 'Welcome',
					subHeader: 'Start by selecting your desired option',
					headerStatus: true,
					billHeader: 'View Bill',
					billSubHeader: 'No orders placed',
					billStatus: true,
					helpHeader: 'Need Help?',
					helpSubHeader: 'Call a Waiter',
					helpStatus: true,
					vehicleHeader: 'Call for Vehicle',
					vehicleSubHeader: 'Valet Parking',
					vehicleStatus: true,
					offerHeader: 'View Offers',
					offerSubHeader: 'No offers available',
					offerStatus: true,
					exitHeader: 'Exit',
					exitSubHeader: 'Scan again',
					exitStatus: true,
				},
				imagePath: {
					bill_img: '/uploads/default/homepage/exitImage.svg',
					help_img: '/uploads/default/homepage/helpImage.svg',
					vehicle_img: '/uploads/default/homepage/exitImage.svg',
					offer_img: '/uploads/default/homepage/helpImage.svg',
					exit_img: '/uploads/default/homepage/exitImage.svg'
				}
			}
			this.quickHelpObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'quickHelp',
				data: {
					QH_mainMenuStatus: true,
					QH_billStatus: true,
					QH_waterStatus: true,
					QH_teaStatus: true,
					QH_waiterStatus: true,
					QH_wifiStatus: true,
					QH_essentialKitStatus: true,
					QH_tissueStatus: true
				},
				imagePath: {
					QH_mainMenu_img: 'uploads/default/quickHelp/mainMenu.png',
					QH_bill_img: '/uploads/default/homepage/billImage.svg',
					QH_water_img: '/uploads/default/quickHelp/water.svg',
					QH_tea_img: '/uploads/default/quickHelp/tea.svg',
					QH_waiter_img: '/uploads/default/quickHelp/call waiter.svg',
					QH_wifi_img: '/uploads/default/quickHelp/wifi assistance.svg',
					QH_essentialKit_img: '/uploads/default/quickHelp/essential kit.svg',
					QH_tissue_img: '/uploads/default/quickHelp/tissue.svg'
				}
			}
			this.brokenImageObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'broken',
				data: {},
				imagePath: {
					brokenHomeBanner: '/uploads/default/brokenImages/brokenImage.png',
					brokenHomeCard: '/uploads/default/brokenImages/departCard.svg',
					brokenSectionCard: '/uploads/default/brokenImages/departCard.svg',
					brokenCatCard: '/uploads/default/brokenImages/list.svg',
					brokenLoaderLogo: '/uploads/default/brokenImages/dinamicLogo.svg',
				}
			}
			// this.homepageObject.pos_rest_id = data.pos_rest_id;
			// this.quickHelpObject.pos_rest_id = data.pos_rest_id;
			// this.brokenImageObject.pos_rest_id = data.pos_rest_id;
			this.dynamicThingsObject.pos_rest_id = data.pos_rest_id;
			this.themeForm = {
				'isDefault': true,
				'restaurantName': this.addForm.name ? this.addForm.name : this.editForm.name,
				'restaurant_id': data.restaurant_id,
				'pos_rest_id': data.pos_rest_id,
				'theme': this.themeObject,
				'instruction': this.instructionObject,
				'homePage': this.homepageObject,
				'quickHelp': this.quickHelpObject,
				'broken': this.brokenImageObject,
				'dynamicThings': this.dynamicThingsObject
			}
			console.log('themeform object', this.themeForm);
			this.apiService.ADD_THEME(this.themeForm).subscribe((result) => {
				console.log("add theme result ", result)
				if (result.status) {
					this.doAction();
				} else {
					this.themeObject.error_msg = result.message;
				}
			});
		})
	}

}
