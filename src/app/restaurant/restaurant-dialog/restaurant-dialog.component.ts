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
			let insTheme = themeList.instruction;
			let homeTheme = themeList.homePage;
			let quickTheme = themeList.quickHelp;
			let brokenTheme = themeList.broken;
			let dynamicThings = themeList.dynamicThings;

			this.instructionObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'instructionPage',
				data: {
					header: insTheme.data.header,
					subHeader: insTheme.data.subHeader,
					headerStatus: insTheme.data.headerStatus,
					card1_title: insTheme.data.card1_title,
					card1_desc: insTheme.data.card1_desc,
					card1_status: insTheme.data.card1_status,
					card2_title: insTheme.data.card2_title,
					card2_desc: insTheme.data.card2_desc,
					card2_status: insTheme.data.card2_status,
					card3_title: insTheme.data.card3_title,
					card3_desc: insTheme.data.card3_desc,
					card3_status: insTheme.data.card3_status,
					card4_title: insTheme.data.card4_title,
					card4_desc: insTheme.data.card4_desc,
					card4_status: insTheme.data.card4_status,
					card5_title: insTheme.data.card5_title,
					card5_desc: insTheme.data.card5_desc,
					card5_status: insTheme.data.card5_status,
					card6_title: insTheme.data.card6_title,
					card6_desc: insTheme.data.card6_desc,
					card6_status: insTheme.data.card6_status,
				},
				imagePath: {
					card1_img: insTheme.imagePath.card1_img,
					card2_img: insTheme.imagePath.card2_img,
					card3_img: insTheme.imagePath.card3_img,
					card4_img: insTheme.imagePath.card4_img,
					card5_img: insTheme.imagePath.card5_img,
					card6_img: insTheme.imagePath.card6_img,
				}
			}
			this.homepageObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'homePage',
				data: {
					header: homeTheme.data.header,
					subHeader: homeTheme.data.subHeader,
					headerStatus: homeTheme.data.headerStatus,
					billHeader: homeTheme.data.billHeader,
					billSubHeader: homeTheme.data.billSubHeader,
					billStatus: homeTheme.data.billStatus,
					helpHeader: homeTheme.data.helpHeader,
					helpSubHeader: homeTheme.data.helpSubHeader,
					helpStatus: homeTheme.data.helpStatus,
					vehicleHeader: homeTheme.data.vehicleHeader,
					vehicleSubHeader: homeTheme.data.vehicleSubHeader,
					vehicleStatus: homeTheme.data.vehicleStatus,
					offerHeader: homeTheme.data.offerHeader,
					offerSubHeader: homeTheme.data.offerSubHeader,
					offerStatus: homeTheme.data.offerStatus,
					exitHeader: homeTheme.data.exitHeader,
					exitSubHeader: homeTheme.data.exitSubHeader,
					exitStatus: homeTheme.data.exitStatus,
				},
				imagePath: {
					bill_img: homeTheme.imagePath.bill_img,
					help_img: homeTheme.imagePath.help_img,
					vehicle_img: homeTheme.imagePath.vehicle_img,
					offer_img: homeTheme.imagePath.offer_img,
					exit_img: homeTheme.imagePath.exit_img,
				}
			}
			this.quickHelpObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'quickHelp',
				data: {
					QH_mainMenuStatus: quickTheme.data.QH_mainMenu_img,
					QH_billStatus: quickTheme.data.QH_billStatus,
					QH_waterStatus: quickTheme.data.QH_waterStatus,
					QH_teaStatus: quickTheme.data.QH_teaStatus,
					QH_waiterStatus: quickTheme.data.QH_waiterStatus,
					QH_wifiStatus: quickTheme.data.QH_wifiStatus,
					QH_essentialKitStatus: quickTheme.data.QH_essentialKitStatus,
					QH_tissueStatus: quickTheme.data.QH_tissueStatus,
				},
				imagePath: {
					QH_mainMenu_img: quickTheme.imagePath.QH_mainMenu_img,
					QH_bill_img: quickTheme.imagePath.QH_bill_img,
					QH_water_img: quickTheme.imagePath.QH_water_img,
					QH_tea_img: quickTheme.imagePath.QH_tea_img,
					QH_waiter_img: quickTheme.imagePath.QH_waiter_img,
					QH_wifi_img: quickTheme.imagePath.QH_wifi_img,
					QH_essentialKit_img: quickTheme.imagePath.QH_essentialKit_img,
					QH_tissue_img: quickTheme.imagePath.QH_tissue_img,
				}
			}
			this.brokenImageObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'broken',
				data: {},
				imagePath: {
					brokenHomeBanner: brokenTheme.imagePath.brokenHomeBanner,
					brokenHomeCard: brokenTheme.imagePath.brokenHomeCard,
					brokenSectionCard: brokenTheme.imagePath.brokenSectionCard,
					brokenCatCard: brokenTheme.imagePath.brokenCatCard,
					brokenLoaderLogo: brokenTheme.imagePath.brokenLoaderLogo,
				}
			}
			this.dynamicThingsObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'dynamicThings',
				data: {
					footerStatus: dynamicThings.data.footerStatus,
					pdfStatus: dynamicThings.data.pdfStatus,
					smsApiStatus: dynamicThings.data.smsApiStatus
				}
			}

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
			this.dynamicThingsObject = {
				pos_rest_id: data.pos_rest_id,
				isDefault: true,
				formType: 'dynamicThings',
				data: {
					footerStatus: true,
					pdfStatus: true,
					smsApiStatus: true
				}
			}

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
