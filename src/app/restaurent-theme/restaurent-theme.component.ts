import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { MatDialog } from "@angular/material/dialog";
import { RestaurentThemeDialogComponent } from './restaurent-theme-dialog/restaurent-theme-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-restaurent-theme',
	templateUrl: './restaurent-theme.component.html',
	styleUrls: ['./restaurent-theme.component.css']
})
export class RestaurentThemeComponent implements OnInit {

	selectedRestaurent = JSON.parse(localStorage.getItem('selected_restaurant')!);
	formType: string = '';
	themeForm: any = {};
	themeObject: any = {};
	homepageObject: any = {};
	formData = new FormData();
	// isDefaultImage: boolean = false;
	isDefaultBillImage: boolean = false;
	isDefaultHelpImage: boolean = false;
	isDefaultVehicleImage: boolean = false;
	isDefaultOfferImage: boolean = false;
	isDefaultExitImage: boolean = false;
	baseUrl = environment.ws_url;

	constructor(public apiService: ApiService, public dialog: MatDialog) { }

	ngOnInit(): void {
	}

	// onEdit(modalName: any) {
	// 	console.log('modalName', modalName);
	// 	this.apiService.THEME_LIST({"pos_rest_id": this.selectedRestaurent.pos_rest_id}).subscribe((result) => {
	// 		console.log('theme result:', result);
	// 		if(result.status) {
	// 			this.openDialog(modalName, result.data);
	// 		} else {
	// 			console.log('Error:', result.message);
	// 		}
	// 	});
	// }

	// openDialog(modalName: any, modalData: any) {
	// 	this.dialog.open(RestaurentThemeDialogComponent, {
	// 		maxWidth: '100vw',
	// 		maxHeight: '100vh',
	// 		height: 'auto',
	// 		width: '750px',
	// 		data: {modalName: modalName, modalData: modalData},
	// 		disableClose: true
	// 	});
	// }

	onEdit(formType: any) {
		this.apiService.THEME_LIST({"pos_rest_id": this.selectedRestaurent.pos_rest_id}).subscribe((result) => {
			if(result.status) {
				if (formType === 'theme') {
					this.formType = 'theme';
					this.themeObject = result.data.theme;
				} else if (formType === 'homepage') {
					this.formType = 'homepage';
					// this.isDefaultImage = true;
					this.isDefaultBillImage = true;
					this.isDefaultHelpImage = true;
					this.isDefaultVehicleImage = true;
					this.isDefaultOfferImage = true;
					this.isDefaultExitImage = true;
					console.log('homepage', result.data.homepage)
					this.homepageObject = result.data.homepage;
				}
			} else {
				console.error(result.message);
			}
		});
	}

	onFileChange(event: any, type: string) {

		if (type === "bill") {
			let billImage = event.target?.files[0];
			console.log('bill image', billImage)
			let billPreview;
			if (billImage) {
				this.formData.append('homepageImages', billImage, 'billImage');
				billPreview = document.getElementById('billPreview')
				billPreview?.setAttribute('src', URL.createObjectURL(billImage));	
			} else {
				billPreview = document.getElementById('billPreview')
				billPreview?.setAttribute('src', '');	
			}
		} else if (type === "help") {
			let helpImage = event.target?.files[0];
			let helpPreview;
			if (helpImage) {
				this.isDefaultHelpImage = false;
				this.formData.append('homepageImages', helpImage, 'helpImage');
				helpPreview = document.getElementById('helpPreview')
				helpPreview?.setAttribute('src', URL.createObjectURL(helpImage));	
			} else {
				helpPreview = document.getElementById('helpPreview')
				helpPreview?.setAttribute('src', '');	
			}
		} else if (type === "vehicle") {
			let vehicleImage = event.target?.files[0];
			let vehiclePreview;
			if (vehicleImage) {
				this.isDefaultVehicleImage = false;
				this.formData.append('homepageImages', vehicleImage, 'vehicleImage');
				vehiclePreview = document.getElementById('vehiclePreview')
				vehiclePreview?.setAttribute('src', URL.createObjectURL(vehicleImage));	
			} else {
				vehiclePreview = document.getElementById('vehiclePreview')
				vehiclePreview?.setAttribute('src', '');	
			}
		} else if (type === "offer") {
			let offerImage = event.target?.files[0];
			let offerPreview;
			if (offerImage) {
				this.isDefaultOfferImage = false;
				this.formData.append('homepageImages', offerImage, 'offerImage');
				offerPreview = document.getElementById('offerPreview')
				offerPreview?.setAttribute('src', URL.createObjectURL(offerImage));
			} else {
				offerPreview = document.getElementById('offerPreview')
				offerPreview?.setAttribute('src', '');
			}
		} else if (type === "exit") {
			let exitImage = event.target?.files[0];
			let exitPreview;
			if (exitImage) {
				this.isDefaultExitImage = false;
				this.formData.append('homepageImages', exitImage, 'exitImage');
				exitPreview = document.getElementById('exitPreview')
				exitPreview?.setAttribute('src', URL.createObjectURL(exitImage));
			} else {
				exitPreview = document.getElementById('exitPreview')
				exitPreview?.setAttribute('src', '');
			}
		}
	}

	onUpdateTheme(updateName: any) {

		if (updateName === 'theme') {
			this.themeObject.pos_rest_id = this.selectedRestaurent.pos_rest_id;
			this.themeObject.isDefaultTheme = false;
			this.themeForm = {
				'isDefault' : false,
				'pos_rest_id': this.themeObject.pos_rest_id,
				'theme': this.themeObject,
			}
			this.apiService.ADD_THEME(this.themeForm).subscribe((result: any) => {
				console.log('theme result', result);
				this.closeForm('theme');
			});
		}
		if (updateName === 'homepage') {
			this.formData.set('isDefault', "false");
			this.formData.set('pos_rest_id', this.selectedRestaurent.pos_rest_id);
			this.formData.set('isDefaultHomepage', "false")
			this.formData.set('header', this.homepageObject.header);
			this.formData.set('subHeader', this.homepageObject.subHeader);
			this.formData.set('headerStatus', this.homepageObject.headerStatus);
			this.formData.set('billHeader', this.homepageObject.billHeader);
			this.formData.set('billSubheader', this.homepageObject.billSubheader);
			this.formData.set('billStatus', this.homepageObject.billStatus);
			this.formData.set('helpHeader', this.homepageObject.helpHeader);
			this.formData.set('helpSubheader', this.homepageObject.helpSubheader);
			this.formData.set('helpStatus', this.homepageObject.helpStatus);
			this.formData.set('vehicleHeader', this.homepageObject.vehicleHeader);
			this.formData.set('vehicleSubheader', this.homepageObject.vehicleSubheader);
			this.formData.set('vehicleStatus', this.homepageObject.vehicleStatus);
			this.formData.set('offerHeader', this.homepageObject.offerHeader);
			this.formData.set('offerSubheader', this.homepageObject.offerSubheader);
			this.formData.set('offerStatus', this.homepageObject.offerStatus);
			this.formData.set('exitHeader', this.homepageObject.exitHeader);
			this.formData.set('exitSubheader', this.homepageObject.exitSubheader);
			this.formData.set('exitStatus', this.homepageObject.exitStatus);

			console.log('homepageObject', this.homepageObject);
			console.log('formData images', this.formData.getAll('homepageImages'));

			this.apiService.ADD_HOMEPAGE_THEME(this.formData).subscribe((result) => {
				console.log("homepage result", result);
				this.closeForm('homepage');
			});
		}

	}

	closeForm(formType: any) {
		if (formType === 'theme') {
			this.formType = '';
		} else if (formType === 'homepage') {
			this.formType = '';
		}
	}


}
