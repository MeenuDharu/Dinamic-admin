import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { MatDialog } from "@angular/material/dialog";
import { environment } from 'src/environments/environment';

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
	homepageObject: any = {};
	quickHelpObject: any = {};
	brokenImagesObject: any = {};
	dynamicThingsObject: any = {};
	formDataInstructionPage = new FormData();
	formDataHomePage = new FormData();
	formDataQuickHelp = new FormData();
	formDataBroken = new FormData();
	baseUrl = environment.ws_url;

	constructor(public apiService: ApiService, public dialog: MatDialog) { }

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
		this.randomQuery = this.getRandomCode();
		console.log('this.randomQuery', this.randomQuery);
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
				if (formType === 'theme') {
					this.formType = 'theme';
					this.themeObject = result.data.theme;
					console.log('ThemeObject: ', this.themeObject);
				} else if (formType === 'instructionPage') {
					this.formType = 'instructionPage';
					this.insData = result.data.instruction?.data;
					this.insImagePath = result.data.instruction?.imagePath;
					console.log('instruction', result.data.instruction)
				} else if (formType === 'homepage') {
					this.formType = 'homepage';
					this.homeData = result.data.homePage?.data;
					this.homeImagePath = result.data.homePage?.imagePath;
					console.log('homepage', result.data.homepage)
					// this.homepageObject = result.data.homepage;
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
					this.dynamicThingsObject = result.data.dynamicThings;
				}
			} else {
				alert(result.message);
			}
		});
	}

	onInstructionFileChange(event: any, fileName: string, preview: string) {
		if(this.formDataInstructionPage.get('instruction')) {
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

	onHomePageFileChange (event: any, fileName: string, preview: string) {
		if(this.formDataHomePage.get('homePage')) {
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

	onQuickHelpFileChange (event: any, fileName: string, preview: string) {
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

	onBrokenImageFileChange (event: any, fileName: string, preview: string) {
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

	// onHomePageFileChange(event: any, type: string) {
	// 	if (type === "bill") {
	// 		let billImage = event.target?.files[0];
	// 		console.log('bill image', billImage)
	// 		let billPreview;
	// 		if (billImage) {
	// 			this.formDataHomePage.append('homepageImages', billImage, 'billImage');
	// 			billPreview = document.getElementById('billPreview')
	// 			billPreview?.setAttribute('src', URL.createObjectURL(billImage));
	// 		} else {
	// 			billPreview = document.getElementById('billPreview')
	// 			billPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === "help") {
	// 		let helpImage = event.target?.files[0];
	// 		let helpPreview;
	// 		if (helpImage) {
	// 			this.formDataHomePage.append('homepageImages', helpImage, 'helpImage');
	// 			helpPreview = document.getElementById('helpPreview')
	// 			helpPreview?.setAttribute('src', URL.createObjectURL(helpImage));
	// 		} else {
	// 			helpPreview = document.getElementById('helpPreview')
	// 			helpPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === "vehicle") {
	// 		let vehicleImage = event.target?.files[0];
	// 		let vehiclePreview;
	// 		if (vehicleImage) {
	// 			this.formDataHomePage.append('homepageImages', vehicleImage, 'vehicleImage');
	// 			vehiclePreview = document.getElementById('vehiclePreview')
	// 			vehiclePreview?.setAttribute('src', URL.createObjectURL(vehicleImage));
	// 		} else {
	// 			vehiclePreview = document.getElementById('vehiclePreview')
	// 			vehiclePreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === "offer") {
	// 		let offerImage = event.target?.files[0];
	// 		let offerPreview;
	// 		if (offerImage) {
	// 			this.formDataHomePage.append('homepageImages', offerImage, 'offerImage');
	// 			offerPreview = document.getElementById('offerPreview')
	// 			offerPreview?.setAttribute('src', URL.createObjectURL(offerImage));
	// 		} else {
	// 			offerPreview = document.getElementById('offerPreview')
	// 			offerPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === "exit") {
	// 		let exitImage = event.target?.files[0];
	// 		let exitPreview;
	// 		if (exitImage) {
	// 			this.formDataHomePage.append('homepageImages', exitImage, 'exitImage');
	// 			exitPreview = document.getElementById('exitPreview')
	// 			exitPreview?.setAttribute('src', URL.createObjectURL(exitImage));
	// 		} else {
	// 			exitPreview = document.getElementById('exitPreview')
	// 			exitPreview?.setAttribute('src', '');
	// 		}
	// 	}
	// }

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

	// onQuickHelpFileChange(event: any, type: string) {
	// 	if (type === "mainMenu") {
	// 		// this.resolution(event);
	// 		let mainMenu = event.target?.files[0];
	// 		console.log('mainMenu image', mainMenu)
	// 		let mainMenuPreview;
	// 		if (mainMenu) {
	// 			this.formDataQuickHelp.append('quickHelpImages', mainMenu, 'mainMenu');
	// 			mainMenuPreview = document.getElementById('mainMenuPreview')
	// 			mainMenuPreview?.setAttribute('src', URL.createObjectURL(mainMenu));
	// 		} else {
	// 			mainMenuPreview = document.getElementById('mainMenuPreview')
	// 			mainMenuPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === "viewBill") {
	// 		let viewBill = event.target?.files[0];
	// 		console.log('viewBill image', viewBill)
	// 		let viewBillPreview;
	// 		if (viewBill) {
	// 			this.formDataQuickHelp.append('quickHelpImages', viewBill, 'viewBill');
	// 			viewBillPreview = document.getElementById('viewBillPreview')
	// 			viewBillPreview?.setAttribute('src', URL.createObjectURL(viewBill));
	// 		} else {
	// 			viewBillPreview = document.getElementById('viewBillPreview')
	// 			viewBillPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'water') {
	// 		let waterImage = event.target.files[0];
	// 		let waterPreview;
	// 		if (waterImage) {
	// 			this.formDataQuickHelp.append('quickHelpImages', waterImage, 'water');
	// 			waterPreview = document.getElementById('waterPreview');
	// 			waterPreview?.setAttribute('src', URL.createObjectURL(waterImage));
	// 		} else {
	// 			waterPreview = document.getElementById('waterPreview');
	// 			waterPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'tea') {
	// 		let teaImage = event.target.files[0];
	// 		let teaPreview;
	// 		if (teaImage) {
	// 			this.formDataQuickHelp.append('quickHelpImages', teaImage, 'tea');
	// 			teaPreview = document.getElementById('teaPreview');
	// 			teaPreview?.setAttribute('src', URL.createObjectURL(teaImage));
	// 		} else {
	// 			teaPreview = document.getElementById('teaPreview');
	// 			teaPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'waiter') {
	// 		let waiterImage = event.target.files[0];
	// 		let waiterPreview;
	// 		if (waiterImage) {
	// 			this.formDataQuickHelp.append('quickHelpImages', waiterImage, 'call waiter');
	// 			waiterPreview = document.getElementById('waiterPreview');
	// 			waiterPreview?.setAttribute('src', URL.createObjectURL(waiterImage));
	// 		} else {
	// 			waiterPreview = document.getElementById('waiterPreview');
	// 			waiterPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'wifi') {
	// 		let wifiImage = event.target.files[0];
	// 		let wifiPreview;
	// 		if (wifiImage) {
	// 			this.formDataQuickHelp.append('quickHelpImages', wifiImage, 'wifi assistance');
	// 			wifiPreview = document.getElementById('wifiPreview');
	// 			wifiPreview?.setAttribute('src', URL.createObjectURL(wifiImage));
	// 		} else {
	// 			wifiPreview = document.getElementById('wifiPreview');
	// 			wifiPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'essentialKit') {
	// 		let essentialKitImage = event.target.files[0];
	// 		let essentialKitPreview;
	// 		if (essentialKitImage) {
	// 			this.formDataQuickHelp.append('quickHelpImages', essentialKitImage, 'essential kit');
	// 			essentialKitPreview = document.getElementById('essentialKitPreview');
	// 			essentialKitPreview?.setAttribute('src', URL.createObjectURL(essentialKitImage));
	// 		} else {
	// 			essentialKitPreview = document.getElementById('essentialKitPreview');
	// 			essentialKitPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'tissue') {
	// 		let tissueImage = event.target.files[0];
	// 		let tissuePreview;
	// 		if (tissueImage) {
	// 			this.formDataQuickHelp.append('quickHelpImages', tissueImage, 'tissue');
	// 			tissuePreview = document.getElementById('tissuePreview');
	// 			tissuePreview?.setAttribute('src', URL.createObjectURL(tissueImage));
	// 		} else {
	// 			tissuePreview = document.getElementById('tissuePreview');
	// 			tissuePreview?.setAttribute('src', '');
	// 		}
	// 	}
	// }

	// onBrokenImageFileChange(event: any, type: string) {
	// 	if (type === 'homePageBanner') {
	// 		let bannerImage = event.target.files[0];
	// 		let bannerPreview;
	// 		if (bannerImage) {
	// 			this.formDataBrokenImages.append('brokenImages', bannerImage, 'homePageBanner');
	// 			bannerPreview = document.getElementById('homePageBannerPreview');
	// 			bannerPreview?.setAttribute('src', URL.createObjectURL(bannerImage));
	// 		} else {
	// 			bannerPreview = document.getElementById('homePageBannerPreview');
	// 			bannerPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'homePageCard') {
	// 		let homePageCardImage = event.target.files[0];
	// 		let homePageCardPreview;
	// 		if (homePageCardImage) {
	// 			this.formDataBrokenImages.append('brokenImages', homePageCardImage, 'homePageCard');
	// 			homePageCardPreview = document.getElementById('homePageCardPreview');
	// 			homePageCardPreview?.setAttribute('src', URL.createObjectURL(homePageCardImage));
	// 		} else {
	// 			homePageCardPreview = document.getElementById('homePageCardPreview');
	// 			homePageCardPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'sectionCard') {
	// 		let sectionCardImage = event.target.files[0];
	// 		let sectionCardPreview;
	// 		if (sectionCardImage) {
	// 			this.formDataBrokenImages.append('brokenImages', sectionCardImage, 'sectionCard');
	// 			sectionCardPreview = document.getElementById('sectionCardPreview');
	// 			sectionCardPreview?.setAttribute('src', URL.createObjectURL(sectionCardImage));
	// 		} else {
	// 			sectionCardPreview = document.getElementById('sectionCardPreview');
	// 			sectionCardPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'categoriesCard') {
	// 		let categoriesCardImage = event.target.files[0];
	// 		let categoriesCardPreview;
	// 		if (categoriesCardImage) {
	// 			this.formDataBrokenImages.append('brokenImages', categoriesCardImage, 'categoriesCard');
	// 			categoriesCardPreview = document.getElementById('categoriesCardPreview');
	// 			categoriesCardPreview?.setAttribute('src', URL.createObjectURL(categoriesCardImage));
	// 		} else {
	// 			categoriesCardPreview = document.getElementById('categoriesCardPreview');
	// 			categoriesCardPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'logo') {
	// 		let logoImage = event.target.files[0];
	// 		let logoPreview;
	// 		if (logoImage) {
	// 			this.formDataBrokenImages.append('brokenImages', logoImage, 'logo');
	// 			logoPreview = document.getElementById('logoPreview');
	// 			logoPreview?.setAttribute('src', URL.createObjectURL(logoImage));
	// 		} else {
	// 			logoPreview = document.getElementById('logoPreview');
	// 			logoPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'loginLogo') {
	// 		let loginLogoImage = event.target.files[0];
	// 		let loginLogoPreview;
	// 		if (loginLogoImage) {
	// 			this.formDataBrokenImages.append('brokenImages', loginLogoImage, 'loginLogo');
	// 			loginLogoPreview = document.getElementById('loginLogoPreview');
	// 			loginLogoPreview?.setAttribute('src', URL.createObjectURL(loginLogoImage));
	// 		} else {
	// 			loginLogoPreview = document.getElementById('loginLogoPreview');
	// 			loginLogoPreview?.setAttribute('src', '');
	// 		}
	// 	} else if (type === 'loaderLogo') {
	// 		let loaderLogoImage = event.target.files[0];
	// 		let loaderLogoPreview;
	// 		if (loaderLogoImage) {
	// 			this.formDataBrokenImages.append('brokenImages', loaderLogoImage, 'loaderLogo');
	// 			loaderLogoPreview = document.getElementById('loaderLogoPreview');
	// 			loaderLogoPreview?.setAttribute('src', URL.createObjectURL(loaderLogoImage));
	// 		} else {
	// 			loaderLogoPreview = document.getElementById('loaderLogoPreview');
	// 			loaderLogoPreview?.setAttribute('src', '');
	// 		}
	// 	}
	// }

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
			if(this.formDataInstructionPage.get('instruction')) {
				this.formDataInstructionPage.delete('instruction');
				this.formDataInstructionPage.delete('instructionPageImages');
			}
			let instruction = JSON.stringify({
				isDefault: false,
				pos_rest_id: this.selectedrestaurant.pos_rest_id,
				formType: 'instructionPage',
				data: this.insData
			});
			console.log({insData: this.insData});
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
			console.log({homeData: this.homeData});
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
			this.dynamicThingsObject.pos_rest_id = this.selectedrestaurant.pos_rest_id;
			this.dynamicThingsObject.isDefaultDynamicThings = false;
			this.themeForm = {
				'isDefault': false,
				'pos_rest_id': this.dynamicThingsObject.pos_rest_id,
				'data': this.dynamicThingsObject,
			}
			this.apiService.ADD_DYNAMIC_THINGS_THEME(this.themeForm).subscribe((result) => {
				console.log('dynamicThings', result);
				if (result.status) {
					this.closeForm();
				} else {
					console.error(result.message);
				}
			});
		}
		// else if (updateName === 'homepage') {
		// 	this.formDataHomePage.set('isDefault', "false");
		// 	this.formDataHomePage.set('pos_rest_id', this.selectedrestaurant.pos_rest_id);
		// 	this.formDataHomePage.set('isDefaultHomepage', "false");
		// 	this.formDataHomePage.set('formType', 'homepage');
		// 	this.formDataHomePage.set('header', this.homepageObject.header);
		// 	this.formDataHomePage.set('subHeader', this.homepageObject.subHeader);
		// 	this.formDataHomePage.set('headerStatus', this.homepageObject.headerStatus);
		// 	this.formDataHomePage.set('billHeader', this.homepageObject.billHeader);
		// 	this.formDataHomePage.set('billSubHeader', this.homepageObject.billSubHeader);
		// 	this.formDataHomePage.set('billStatus', this.homepageObject.billStatus);
		// 	this.formDataHomePage.set('helpHeader', this.homepageObject.helpHeader);
		// 	this.formDataHomePage.set('helpSubHeader', this.homepageObject.helpSubHeader);
		// 	this.formDataHomePage.set('helpStatus', this.homepageObject.helpStatus);
		// 	this.formDataHomePage.set('vehicleHeader', this.homepageObject.vehicleHeader);
		// 	this.formDataHomePage.set('vehicleSubHeader', this.homepageObject.vehicleSubHeader);
		// 	this.formDataHomePage.set('vehicleStatus', this.homepageObject.vehicleStatus);
		// 	this.formDataHomePage.set('offerHeader', this.homepageObject.offerHeader);
		// 	this.formDataHomePage.set('offerSubHeader', this.homepageObject.offerSubHeader);
		// 	this.formDataHomePage.set('offerStatus', this.homepageObject.offerStatus);
		// 	this.formDataHomePage.set('exitHeader', this.homepageObject.exitHeader);
		// 	this.formDataHomePage.set('exitSubHeader', this.homepageObject.exitSubHeader);
		// 	this.formDataHomePage.set('exitStatus', this.homepageObject.exitStatus);

		// 	console.log('homepageObject', this.homepageObject);
		// 	console.log('formDataHomePage images', this.formDataHomePage.getAll('homepageImages'));

		// 	this.apiService.ADD_HOMEPAGE_THEME(this.formDataHomePage).subscribe((result) => {
		// 		console.log("homepage result", result);
		// 		this.closeForm();
		// 	});
		// } 
		// else if (updateName === 'quickHelp') {
		// 	this.formDataQuickHelp.set('isDefault', "false");
		// 	this.formDataQuickHelp.set('pos_rest_id', this.selectedrestaurant.pos_rest_id);
		// 	this.formDataQuickHelp.set('formType', 'quickHelp');
		// 	this.formDataQuickHelp.set('isDefaultQuickHelp', "false");
		// 	this.formDataQuickHelp.set('mainMenuStatus', this.quickHelpObject.mainMenuStatus);
		// 	this.formDataQuickHelp.set('viewBillStatus', this.quickHelpObject.viewBillStatus);
		// 	this.formDataQuickHelp.set('waterStatus', this.quickHelpObject.waterStatus);
		// 	this.formDataQuickHelp.set('teaStatus', this.quickHelpObject.teaStatus);
		// 	this.formDataQuickHelp.set('call waiterStatus', this.quickHelpObject['call waiterStatus']);
		// 	this.formDataQuickHelp.set('wifi assistanceStatus', this.quickHelpObject['wifi assistanceStatus']);
		// 	this.formDataQuickHelp.set('essential kitStatus', this.quickHelpObject['essential kitStatus']);
		// 	this.formDataQuickHelp.set('tissueStatus', this.quickHelpObject.tissueStatus);
		// 	console.log('quickhelp object... ', this.formDataQuickHelp.get('call waiterStatus'));
		// 	this.apiService.ADD_QUICKHELP_THEME(this.formDataQuickHelp).subscribe((result) => {
		// 		console.log('quickHelp', result);
		// 		if (result.status) {
		// 			this.closeForm();
		// 		} else {
		// 			console.error(result.message);
		// 		}
		// 	});
		// } else if (updateName === 'brokenImages') {
		// 	this.formDataBrokenImages.set('isDefault', 'false');
		// 	this.formDataBrokenImages.set('isDefaultBrokenImages', 'false');
		// 	this.formDataBrokenImages.set('pos_rest_id', this.selectedrestaurant.pos_rest_id);
		// 	this.formDataBrokenImages.set('formType', 'brokenImages');
		// 	this.apiService.ADD_BROKENIMAGES_THEME(this.formDataBrokenImages).subscribe((result) => {
		// 		console.log('brokenImages', result);
		// 		if (result.status) {
		// 			this.closeForm();
		// 		} else {
		// 			console.error(result.message);
		// 		}

		// 	});
		// } 
		// else if (updateName === 'dynamicThings') {
		// 	this.dynamicThingsObject.pos_rest_id = this.selectedrestaurant.pos_rest_id;
		// 	this.dynamicThingsObject.isDefaultDynamicThings = false;
		// 	this.themeForm = {
		// 		'isDefault': false,
		// 		'pos_rest_id': this.dynamicThingsObject.pos_rest_id,
		// 		'data': this.dynamicThingsObject,
		// 	}
		// 	this.apiService.ADD_DYNAMIC_THINGS_THEME(this.themeForm).subscribe((result) => {
		// 		console.log('dynamicThings', result);
		// 		if (result.status) {
		// 			this.closeForm();
		// 		} else {
		// 			console.error(result.message);
		// 		}
		// 	});
		// }

	}

	closeForm() {
		this.formType = '';
		// this.formDataHomePage.delete('homepageImages');
		// this.formDataQuickHelp.delete('quickHelpImages');
		// this.formDataBroken.delete('brokenImages');
	}


}
