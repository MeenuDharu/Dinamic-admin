import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { MatDialog } from "@angular/material/dialog";
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
	quickHelpObject: any = {};
	brokenImagesObject: any = {};
	formDataHomePage = new FormData();
	formDataQuickHelp = new FormData();
	formDataBrokenImages = new FormData();
	isDefaultBillImage: boolean = false;
	isDefaultHelpImage: boolean = false;
	isDefaultVehicleImage: boolean = false;
	isDefaultOfferImage: boolean = false;
	isDefaultExitImage: boolean = false;
	isDefaultWaterImage: boolean = false;
	isDefaultTeaImage: boolean = false;
	isDefaultWaiterImage: boolean = false;
	isDefaultWifiImage: boolean = false;
	isDefaultEssentialKitImage: boolean = false;
	isDefaultTissueImage: boolean = false;
	isDefaultHomePageBanner: boolean = false;
	isDefaultHomePageCard: boolean = false;
	isDefaultSectionCard: boolean = false;
	isDefaultCategoriesCard: boolean = false;
	isDefaultLogo: boolean = false;
	isDefaultLoginLogo: boolean = false;
	isDefaultLoaderLogo: boolean = false;

	baseUrl = environment.ws_url;

	constructor(public apiService: ApiService, public dialog: MatDialog) { }

	ngOnInit(): void {
	}

	onEdit(formType: any) {
		this.themeObject = [];
		this.homepageObject = [];
		this.quickHelpObject = [];
		this.apiService.THEME_LIST({ "pos_rest_id": this.selectedRestaurent.pos_rest_id }).subscribe((result) => {
			if (result.status) {
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
				} else if (formType === 'quickHelp') {
					this.formType = 'quickHelp';
					this.isDefaultWaterImage = true;
					this.isDefaultTeaImage = true;
					this.isDefaultWaiterImage = true;
					this.isDefaultWifiImage = true;
					this.isDefaultEssentialKitImage = true;
					this.isDefaultTissueImage = true;
					this.quickHelpObject = result.data.quickHelp;
					console.log('quickHelpObject', this.quickHelpObject)
				} else if (formType === 'brokenImages') {
					this.formType = 'brokenImages'
					this.isDefaultHomePageBanner = true;
					this.isDefaultHomePageCard = true;
					this.isDefaultSectionCard = true;
					this.isDefaultCategoriesCard = true;
					this.isDefaultLogo = true;
					this.isDefaultLoginLogo = true;
					this.isDefaultLoaderLogo = true;
					this.brokenImagesObject = result.data.brokenImages;
					console.log('brokenImages', this.brokenImagesObject);
				}
			} else {
				console.error(result.message);
			}
		});
	}

	onHomePageFileChange(event: any, type: string) {

		if (type === "bill") {
			let billImage = event.target?.files[0];
			console.log('bill image', billImage)
			let billPreview;
			if (billImage) {
				this.formDataHomePage.append('homepageImages', billImage, 'billImage');
				billPreview = document.getElementById('billPreview')
				billPreview?.setAttribute('src', URL.createObjectURL(billImage));
			} else {
				billPreview = document.getElementById('billPreview')
				billPreview?.setAttribute('src', '');
			}
		} else
			if (type === "help") {
				let helpImage = event.target?.files[0];
				let helpPreview;
				if (helpImage) {
					this.formDataHomePage.append('homepageImages', helpImage, 'helpImage');
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
					this.formDataHomePage.append('homepageImages', vehicleImage, 'vehicleImage');
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
					this.formDataHomePage.append('homepageImages', offerImage, 'offerImage');
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
					this.formDataHomePage.append('homepageImages', exitImage, 'exitImage');
					exitPreview = document.getElementById('exitPreview')
					exitPreview?.setAttribute('src', URL.createObjectURL(exitImage));
				} else {
					exitPreview = document.getElementById('exitPreview')
					exitPreview?.setAttribute('src', '');
				}
			}
	}

	onQuickHelpFileChange(event: any, type: string) {
		if (type === 'water') {
			let waterImage = event.target.files[0];
			let waterPreview;
			if (waterImage) {
				this.formDataQuickHelp.append('quickHelpImages', waterImage, 'water');
				waterPreview = document.getElementById('waterPreview');
				waterPreview?.setAttribute('src', URL.createObjectURL(waterImage));
			} else {
				waterPreview = document.getElementById('waterPreview');
				waterPreview?.setAttribute('src', '');
			}
		} else if (type === 'tea') {
			let teaImage = event.target.files[0];
			let teaPreview;
			if (teaImage) {
				this.formDataQuickHelp.append('quickHelpImages', teaImage, 'tea');
				teaPreview = document.getElementById('teaPreview');
				teaPreview?.setAttribute('src', URL.createObjectURL(teaImage));
			} else {
				teaPreview = document.getElementById('teaPreview');
				teaPreview?.setAttribute('src', '');
			}
		} else if (type === 'waiter') {
			let waiterImage = event.target.files[0];
			let waiterPreview;
			if (waiterImage) {
				this.formDataQuickHelp.append('quickHelpImages', waiterImage, 'call waiter');
				waiterPreview = document.getElementById('waiterPreview');
				waiterPreview?.setAttribute('src', URL.createObjectURL(waiterImage));
			} else {
				waiterPreview = document.getElementById('waiterPreview');
				waiterPreview?.setAttribute('src', '');
			}
		} else if (type === 'wifi') {
			let wifiImage = event.target.files[0];
			let wifiPreview;
			if (wifiImage) {
				this.formDataQuickHelp.append('quickHelpImages', wifiImage, 'wifi assistance');
				wifiPreview = document.getElementById('wifiPreview');
				wifiPreview?.setAttribute('src', URL.createObjectURL(wifiImage));
			} else {
				wifiPreview = document.getElementById('wifiPreview');
				wifiPreview?.setAttribute('src', '');
			}
		} else if (type === 'essentialKit') {
			let essentialKitImage = event.target.files[0];
			let essentialKitPreview;
			if (essentialKitImage) {
				this.formDataQuickHelp.append('quickHelpImages', essentialKitImage, 'essential kit');
				essentialKitPreview = document.getElementById('essentialKitPreview');
				essentialKitPreview?.setAttribute('src', URL.createObjectURL(essentialKitImage));
			} else {
				essentialKitPreview = document.getElementById('essentialKitPreview');
				essentialKitPreview?.setAttribute('src', '');
			}
		} else if (type === 'tissue') {
			let tissueImage = event.target.files[0];
			let tissuePreview;
			if (tissueImage) {
				this.formDataQuickHelp.append('quickHelpImages', tissueImage, 'tissue');
				tissuePreview = document.getElementById('tissuePreview');
				tissuePreview?.setAttribute('src', URL.createObjectURL(tissueImage));
			} else {
				tissuePreview = document.getElementById('tissuePreview');
				tissuePreview?.setAttribute('src', '');
			}
		}
	}

	onBrokenImageFileChange(event: any, type: string) {
		if (type === 'homePageBanner') {
			let bannerImage = event.target.files[0];
			let bannerPreview;
			if (bannerImage) {
				this.formDataBrokenImages.append('brokenImages', bannerImage, 'homePageBanner');
				bannerPreview = document.getElementById('homePageBannerPreview');
				bannerPreview?.setAttribute('src', URL.createObjectURL(bannerImage));
			} else {
				bannerPreview = document.getElementById('homePageBannerPreview');
				bannerPreview?.setAttribute('src', '');
			}
		} else if (type === 'homePageCard') {
			let homePageCardImage = event.target.files[0];
			let homePageCardPreview;
			if (homePageCardImage) {
				this.formDataBrokenImages.append('brokenImages', homePageCardImage, 'homePageCard');
				homePageCardPreview = document.getElementById('homePageCardPreview');
				homePageCardPreview?.setAttribute('src', URL.createObjectURL(homePageCardImage));
			} else {
				homePageCardPreview = document.getElementById('homePageCardPreview');
				homePageCardPreview?.setAttribute('src', '');
			}
		} else if (type === 'sectionCard') {
			let sectionCardImage = event.target.files[0];
			let sectionCardPreview;
			if (sectionCardImage) {
				this.formDataBrokenImages.append('brokenImages', sectionCardImage, 'sectionCard');
				sectionCardPreview = document.getElementById('sectionCardPreview');
				sectionCardPreview?.setAttribute('src', URL.createObjectURL(sectionCardImage));
			} else {
				sectionCardPreview = document.getElementById('sectionCardPreview');
				sectionCardPreview?.setAttribute('src', '');
			}
		} else if (type === 'categoriesCard') {
			let categoriesCardImage = event.target.files[0];
			let categoriesCardPreview;
			if (categoriesCardImage) {
				this.formDataBrokenImages.append('brokenImages', categoriesCardImage, 'categoriesCard');
				categoriesCardPreview = document.getElementById('categoriesCardPreview');
				categoriesCardPreview?.setAttribute('src', URL.createObjectURL(categoriesCardImage));
			} else {
				categoriesCardPreview = document.getElementById('categoriesCardPreview');
				categoriesCardPreview?.setAttribute('src', '');
			}
		} else if (type === 'logo') {
			let logoImage = event.target.files[0];
			let logoPreview;
			if (logoImage) {
				this.formDataBrokenImages.append('brokenImages', logoImage, 'logo');
				logoPreview = document.getElementById('logoPreview');
				logoPreview?.setAttribute('src', URL.createObjectURL(logoImage));
			} else {
				logoPreview = document.getElementById('logoPreview');
				logoPreview?.setAttribute('src', '');
			}
		} else if (type === 'loginLogo') {
			let loginLogoImage = event.target.files[0];
			let loginLogoPreview;
			if (loginLogoImage) {
				this.formDataBrokenImages.append('brokenImages', loginLogoImage, 'loginLogo');
				loginLogoPreview = document.getElementById('loginLogoPreview');
				loginLogoPreview?.setAttribute('src', URL.createObjectURL(loginLogoImage));
			} else {
				loginLogoPreview = document.getElementById('loginLogoPreview');
				loginLogoPreview?.setAttribute('src', '');
			}
		} else if (type === 'loaderLogo') {
			let loaderLogoImage = event.target.files[0];
			let loaderLogoPreview;
			if (loaderLogoImage) {
				this.formDataBrokenImages.append('brokenImages', loaderLogoImage, 'loaderLogo');
				loaderLogoPreview = document.getElementById('loaderLogoPreview');
				loaderLogoPreview?.setAttribute('src', URL.createObjectURL(loaderLogoImage));
			} else {
				loaderLogoPreview = document.getElementById('loaderLogoPreview');
				loaderLogoPreview?.setAttribute('src', '');
			}
		}
	}

	onUpdateTheme(updateName: any) {

		if (updateName === 'theme') {
			this.themeObject.pos_rest_id = this.selectedRestaurent.pos_rest_id;
			this.themeObject.isDefaultTheme = false;
			this.themeForm = {
				'isDefault': false,
				'pos_rest_id': this.themeObject.pos_rest_id,
				'theme': this.themeObject,
			}
			this.apiService.ADD_THEME(this.themeForm).subscribe((result: any) => {
				console.log('theme result', result);
				this.closeForm('theme');
			});
		} else if (updateName === 'homepage') {
			this.formDataHomePage.set('isDefault', "false");
			this.formDataHomePage.set('pos_rest_id', this.selectedRestaurent.pos_rest_id);
			this.formDataHomePage.set('isDefaultHomepage', "false");
			this.formDataHomePage.set('formType', 'homepage');
			this.formDataHomePage.set('header', this.homepageObject.header);
			this.formDataHomePage.set('subHeader', this.homepageObject.subHeader);
			this.formDataHomePage.set('headerStatus', this.homepageObject.headerStatus);
			this.formDataHomePage.set('billHeader', this.homepageObject.billHeader);
			this.formDataHomePage.set('billSubheader', this.homepageObject.billSubheader);
			this.formDataHomePage.set('billStatus', this.homepageObject.billStatus);
			this.formDataHomePage.set('helpHeader', this.homepageObject.helpHeader);
			this.formDataHomePage.set('helpSubheader', this.homepageObject.helpSubheader);
			this.formDataHomePage.set('helpStatus', this.homepageObject.helpStatus);
			this.formDataHomePage.set('vehicleHeader', this.homepageObject.vehicleHeader);
			this.formDataHomePage.set('vehicleSubheader', this.homepageObject.vehicleSubheader);
			this.formDataHomePage.set('vehicleStatus', this.homepageObject.vehicleStatus);
			this.formDataHomePage.set('offerHeader', this.homepageObject.offerHeader);
			this.formDataHomePage.set('offerSubheader', this.homepageObject.offerSubheader);
			this.formDataHomePage.set('offerStatus', this.homepageObject.offerStatus);
			this.formDataHomePage.set('exitHeader', this.homepageObject.exitHeader);
			this.formDataHomePage.set('exitSubheader', this.homepageObject.exitSubheader);
			this.formDataHomePage.set('exitStatus', this.homepageObject.exitStatus);

			console.log('homepageObject', this.homepageObject);
			console.log('formDataHomePage images', this.formDataHomePage.getAll('homepageImages'));

			this.apiService.ADD_HOMEPAGE_THEME(this.formDataHomePage).subscribe((result) => {
				console.log("homepage result", result);
				this.closeForm('homepage');
			});
		} else if (updateName === 'quickHelp') {
			this.formDataQuickHelp.set('isDefault', "false");
			this.formDataQuickHelp.set('pos_rest_id', this.selectedRestaurent.pos_rest_id);
			this.formDataQuickHelp.set('formType', 'quickHelp');
			this.formDataQuickHelp.set('isDefaultQuickHelp', "false");
			this.formDataQuickHelp.set('waterStatus', this.quickHelpObject.waterStatus);
			this.formDataQuickHelp.set('teaStatus', this.quickHelpObject.teaStatus);
			this.formDataQuickHelp.set('waiterStatus', this.quickHelpObject.waiterStatus);
			this.formDataQuickHelp.set('wifiStatus', this.quickHelpObject.wifiStatus);
			this.formDataQuickHelp.set('essentialKitStatus', this.quickHelpObject.essentialKitStatus);
			this.formDataQuickHelp.set('tissueStatus', this.quickHelpObject.tissueStatus);
			this.apiService.ADD_QUICKHELP_THEME(this.formDataQuickHelp).subscribe((result) => {
				console.log('quickHelp', result);
				if (result.status) {
					this.closeForm('quickHelp');
				} else {
					console.error(result.message);
				}
			});
		} else if (updateName === 'brokenImages') {
			this.formDataBrokenImages.set('isDefault', 'false');
			this.formDataBrokenImages.set('isDefaultBrokenImages', 'false');
			this.formDataBrokenImages.set('pos_rest_id', this.selectedRestaurent.pos_rest_id);
			this.formDataBrokenImages.set('formType', 'brokenImages');
			this.apiService.ADD_BROKENIMAGES_THEME(this.formDataBrokenImages).subscribe((result) => {
				console.log('brokenImages', result);
				if (result.status) {
					this.closeForm('brokenImages');
				} else {
					console.error(result.message);
				}

			});
		}

	}

	closeForm(formType: any) {
		if (formType === 'theme') {
			this.formType = '';
		} else if (formType === 'homepage') {
			this.formType = '';
		} else if (formType === 'quickHelp') {
			this.formType = '';
		} else if (formType === 'brokenImages') {
			this.formType = '';
		}
	}


}
