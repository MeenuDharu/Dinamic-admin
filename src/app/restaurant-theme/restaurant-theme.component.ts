import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { MatDialog } from "@angular/material/dialog";
import { environment } from 'src/environments/environment';
import { DynamicThemeService } from "../_services/dynamic-theme.service";

@Component({
	selector: 'app-restaurant-theme',
	templateUrl: './restaurant-theme.component.html',
	styleUrls: ['./restaurant-theme.component.css']
})
export class restaurantThemeComponent implements OnInit {

	selectedrestaurant = JSON.parse(localStorage.getItem('selected_restaurant')!);
	randomQuery: string = '';
	formType: string = '';
	themeForm: any = {};
	themeObject: any = {};
	insData: any = {};
	insImagePath: any = {};
	homeData: any = {};
	homeImagePath: any = {};
	quickHelpData: any = {};
	quickHelpImagePath: any = {};
	brokenData: any = {};
	brokenImagePath: any = {};
	dynamicThingsData: any = {};
	homepageObject: any = {};
	quickHelpObject: any = {};
	brokenImagesObject: any = {};
	dynamicThingsObject: any = {};
	formDataInstructionPage = new FormData();
	formDataHomePage = new FormData();
	formDataQuickHelp = new FormData();
	formDataBroken = new FormData();
	baseUrl = environment.ws_url;

	constructor(
		public apiService: ApiService, 
		public dialog: MatDialog,
		public themeService: DynamicThemeService
	) { }

	ngOnInit(): void {
	}

	// generate randomString for queryparams
	getRandomCode = function () {
		let randomText = '';
		let allText = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		for (let i = 0; i < 5; i++) {
			randomText += allText.charAt(Math.floor(Math.random() * allText.length));
		}
		console.log('random Text....', randomText);
		return randomText;
	}

	onEdit(formType: any) {
		if (formType !== this.formType) {
			this.randomQuery = this.getRandomCode();
			this.themeObject = [];
			this.homepageObject = [];
			this.quickHelpObject = [];
			this.insData = [];
			this.insImagePath = [];
			this.homeData = [];
			this.homeImagePath = [];
			this.quickHelpData = [];
			this.quickHelpImagePath = [];

			this.apiService.GET_THEME_LIST({ "pos_rest_id": this.selectedrestaurant.pos_rest_id }).subscribe((result) => {
				console.log('Result: ', result);
				if (result.status) {
					this.themeService.themeList = result.data;
					if (formType === 'theme') {
						this.formType = 'theme';
						this.themeObject = result.data.theme;
						console.log('ThemeObject: ', this.themeObject);
					} else if (formType === 'instructionPage') {
						this.formType = 'instructionPage';
						this.insData = result.data.instruction?.data;
						this.insImagePath = result.data.instruction?.imagePath;
					} else if (formType === 'homepage') {
						this.formType = 'homepage';
						this.homeData = result.data.homePage?.data;
						this.homeImagePath = result.data.homePage?.imagePath;
					} else if (formType === 'quickHelp') {
						this.formType = 'quickHelp';
						this.quickHelpData = result.data.quickHelp?.data;
						this.quickHelpImagePath = result.data.quickHelp?.imagePath;
					} else if (formType === 'broken') {
						this.formType = 'broken'
						this.brokenData = result.data.broken?.data;
						this.brokenImagePath = result.data.broken?.imagePath;
					} else if (formType === 'dynamicThings') {
						this.formType = 'dynamicThings';
						this.dynamicThingsData = result.data.dynamicThings?.data;
					}
				} else {
					alert(result.message);
				}
			});
		}
	}

	onInstructionFileChange(event: any, fileName: string, preview: string) {
		if (this.formDataInstructionPage.get('instruction')) {
			this.formDataInstructionPage.delete('instruction');
			this.formDataInstructionPage.delete('instructionPageImages');
		}
		let cardImage = event.target?.files[0];
		let cardPreview = document.getElementById(preview);
		if (cardImage) {
			this.formDataInstructionPage.append('instructionPageImages', cardImage, fileName);
			cardPreview?.setAttribute('src', URL.createObjectURL(cardImage));
		} else {
			cardPreview?.setAttribute('src', '');
		}
	}

	onHomePageFileChange(event: any, fileName: string, preview: string) {
		if (this.formDataHomePage.get('homePage')) {
			this.formDataHomePage.delete('homePage');
			this.formDataHomePage.delete('homePageImages');
		}
		let cardImage = event.target?.files[0];
		let cardPreview = document.getElementById(preview);
		if (cardImage) {
			this.formDataHomePage.append('homePageImages', cardImage, fileName);
			cardPreview?.setAttribute('src', URL.createObjectURL(cardImage));
		} else {
			cardPreview?.setAttribute('src', '');
		}
	}

	onQuickHelpFileChange(event: any, fileName: string, preview: string) {
		if (this.formDataQuickHelp.get('quickHelp')) {
			this.formDataQuickHelp.delete('quickHelp');
			this.formDataQuickHelp.delete('quickHelpImages');
		}
		let cardImage = event.target?.files[0];
		let cardPreview = document.getElementById(preview);
		if (cardImage) {
			this.formDataQuickHelp.append('quickHelpImages', cardImage, fileName);
			cardPreview?.setAttribute('src', URL.createObjectURL(cardImage));
		} else {
			cardPreview?.setAttribute('src', '');
		}
	}

	onBrokenImageFileChange(event: any, fileName: string, preview: string) {
		if (this.formDataBroken.get('broken')) {
			this.formDataBroken.delete('broken');
			this.formDataBroken.delete('brokenImages')
		}
		let cardImage = event.target?.files[0];
		let cardPreview = document.getElementById(preview);
		if (cardImage) {
			this.formDataBroken.append('brokenImages', cardImage, fileName);
			cardPreview?.setAttribute('src', URL.createObjectURL(cardImage));
		} else {
			cardPreview?.setAttribute('src', '');
		}
	}

	resolution(event: any) {
		console.log(event);
		let img = new Image();
		img.src = window.URL.createObjectURL(event.target.files[0]);
		img.onload = () => {
			if (((img.width < 150) || (img.width === 150)) && ((img.height < 150) || (img.height === 150))) {
				return alert(`Nice, image is the right size. It can be uploaded`)
			} else {
				return alert(`Sorry, this image doesn't look like the size we wanted. It's ${img.width} x ${img.height} but we require 100 x 100 size image.`);
			}
		}
	}

	onUpdateTheme(updateName: any) {
		if (updateName === 'theme') {
			this.themeObject.pos_rest_id = this.selectedrestaurant.pos_rest_id;
			this.themeObject.isDefaultTheme = false;
			this.themeForm = {
				'isDefault': false,
				'pos_rest_id': this.themeObject.pos_rest_id,
				'theme': this.themeObject,
			}
			this.apiService.ADD_THEME(this.themeForm).subscribe((result: any) => {
				console.log('theme result', result);
				this.closeForm();
			});
		} else if (updateName === 'instructionPage') {
			if (this.formDataInstructionPage.get('instruction')) {
				this.formDataInstructionPage.delete('instruction');
				this.formDataInstructionPage.delete('instructionPageImages');
			}
			let instruction = JSON.stringify({
				isDefault: false,
				pos_rest_id: this.selectedrestaurant.pos_rest_id,
				formType: 'instructionPage',
				data: this.insData
			});
			console.log({ insData: this.insData });
			this.formDataInstructionPage.append('instruction', instruction);
			this.apiService.ADD_INSTRUCTION_PAGE_THEME(this.formDataInstructionPage).subscribe((result: any) => {
				this.closeForm();
			});
		} else if (updateName === 'homepage') {
			if (this.formDataHomePage.get('homePage')) {
				this.formDataHomePage.delete('homePage');
				this.formDataHomePage.delete('homePageImages');
			}
			let homePage = JSON.stringify({
				isDefault: false,
				pos_rest_id: this.selectedrestaurant.pos_rest_id,
				formType: 'homePage',
				data: this.homeData
			});
			console.log({ homeData: this.homeData });
			this.formDataHomePage.append('homePage', homePage);
			this.apiService.ADD_HOMEPAGE_THEME(this.formDataHomePage).subscribe((result: any) => {
				this.closeForm();
			});
		} else if (updateName === 'quickHelp') {
			if (this.formDataQuickHelp.get('quickHelp')) {
				this.formDataQuickHelp.delete('quickHelp');
				this.formDataQuickHelp.delete('quickHelpImages');
			}
			let quickHelp = JSON.stringify({
				isDefault: false,
				pos_rest_id: this.selectedrestaurant.pos_rest_id,
				formType: 'quickHelp',
				data: this.quickHelpData
			});
			this.formDataQuickHelp.append('quickHelp', quickHelp);
			this.apiService.ADD_QUICKHELP_THEME(this.formDataQuickHelp).subscribe((result: any) => {
				this.closeForm();
			});
		} else if (updateName === 'broken') {
			if (this.formDataBroken.get('broken')) {
				this.formDataBroken.delete('broken');
				this.formDataBroken.delete('brokenImages');
			}
			let broken = JSON.stringify({
				isDefault: false,
				pos_rest_id: this.selectedrestaurant.pos_rest_id,
				formType: 'broken',
				data: this.brokenData
			});
			this.formDataBroken.append('broken', broken);
			this.apiService.ADD_BROKEN_THEME(this.formDataBroken).subscribe((result: any) => {
				this.closeForm();
			})
		} else if (updateName === 'dynamicThings') {
			let dynamicThings = {
				isDefault: false,
				pos_rest_id: this.selectedrestaurant.pos_rest_id,
				formType: 'dynamicThings',
				data: this.dynamicThingsData
			}
			this.apiService.ADD_DYNAMIC_THINGS_THEME(dynamicThings).subscribe((result) => {
				console.log('dynamicThings', result);
				if (result.status) {
					this.closeForm();
				} else {
					console.error(result.message);
				}
			});
		}
	}

	closeForm() {
		this.formType = '';
	}


}
