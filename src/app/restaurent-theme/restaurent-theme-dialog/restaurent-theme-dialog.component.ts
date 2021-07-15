import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from 'src/app/_services/api.service';

export interface IThemeForm {
	pos_rest_id?: string;
	isDefault?: boolean;
	theme?: object;
	homepage?: object;
}

@Component({
	selector: 'app-restaurent-theme-dialog',
	templateUrl: './restaurent-theme-dialog.component.html',
	styleUrls: ['./restaurent-theme-dialog.component.css']
})
export class RestaurentThemeDialogComponent implements OnInit {

	themeForm: any = {};
	themeObject: any = {};
	homepageObject: any = {};
	modalType: string = '';
	modalObject: any;
	modalData: any;
	formData = new FormData();
	selectedRestaurent = JSON.parse(localStorage.getItem('selected_restaurant')!);

	constructor(
		public apiService: ApiService,
		@Optional() @Inject(MAT_DIALOG_DATA) data: IThemeForm,
		public dialogRef: MatDialogRef<RestaurentThemeDialogComponent>,) {
		console.log('DialogData: ', data);
		this.modalObject = data;
	}

	ngOnInit(): void {
		this.themeObject = {};
		this.homepageObject = {};
		this.modalType = this.modalObject.modalName;
		this.modalData = this.modalObject.modalData;
		console.log(this.modalType);
		console.log(this.modalData);
		if (this.modalType === 'theme') {
			this.themeObject = this.modalData.theme;
		} else if (this.modalType === 'homepage') {
			this.homepageObject = this.modalData.homepage;
			this.homepageObject.headerStatus = true;
			this.homepageObject.billStatus = true;
			this.homepageObject.helpStatus = true;
			this.homepageObject.vehicleStatus = true;
			this.homepageObject.offerStatus = true;
			this.homepageObject.exitStatus = true;
		} else if (this.modalType === 'section') {

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
				this.closeDialog();
			});
		}
		if (updateName === 'homepage') {
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
				this.closeDialog();
			});
		}
	}

	onFileChange(event: any, type: string) {
		
		if (type === "bill") {
			const billImage = event.target?.files[0];
			this.formData.append('homepageImages', billImage, 'billImage');
			// this.homepageObject['billImage'] = billImage;
			const billPreview = document.getElementById('billPreview')
			billPreview?.setAttribute('src', URL.createObjectURL(billImage));
		} else if (type === "help") {
			const helpImage = event.target?.files[0];
			this.formData.append('homepageImages', helpImage, 'helpImage');
			// this.homepageObject['helpImage'] = helpImage;
			const helpPreview = document.getElementById('helpPreview')
			helpPreview?.setAttribute('src', URL.createObjectURL(helpImage));
		} else if (type === "vehicle") {
			const vehicleImage = event.target?.files[0];
			this.formData.append('homepageImages', vehicleImage, 'vehicleImage');
			// this.homepageObject['vehicleImage'] = vehicleImage;
			const vehiclePreview = document.getElementById('vehiclePreview')
			vehiclePreview?.setAttribute('src', URL.createObjectURL(vehicleImage));
		} else if (type === "offer") {
			const offerImage = event.target?.files[0];
			this.formData.append('homepageImages', offerImage, 'offerImage');
			const offerPreview = document.getElementById('offerPreview')
			offerPreview?.setAttribute('src', URL.createObjectURL(offerImage));
		} else if (type === "exit") {
			const exitImage = event.target?.files[0];
			this.formData.append('homepageImages', exitImage, 'exitImage');
			const exitPreview = document.getElementById('exitPreview')
			exitPreview?.setAttribute('src', URL.createObjectURL(exitImage));
		}
	}

	closeDialog() {
		this.dialogRef.close({ event: 'Cancel' });
	}


}
