import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { MatDialog } from "@angular/material/dialog";
import { RestaurentThemeDialogComponent } from './restaurent-theme-dialog/restaurent-theme-dialog.component';

@Component({
	selector: 'app-restaurent-theme',
	templateUrl: './restaurent-theme.component.html',
	styleUrls: ['./restaurent-theme.component.css']
})
export class RestaurentThemeComponent implements OnInit {

	selectedRestaurent = JSON.parse(localStorage.getItem('selected_restaurant')!);
	modalType: string = '';
	themeObject: any;

	constructor(public apiService: ApiService, public dialog: MatDialog) { }

	ngOnInit(): void {
	}

	onEdit(modalName: any) {
		console.log('modalName', modalName);
		this.apiService.THEME_LIST({"pos_rest_id": this.selectedRestaurent.pos_rest_id}).subscribe((result) => {
			console.log('theme result:', result);
			if(result.status) {
				this.openDialog(modalName, result.data);
			} else {
				console.log('Error:', result.message);
			}
		});
	}

	openDialog(modalName: any, modalData: any) {
		this.dialog.open(RestaurentThemeDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: 'auto',
			width: '750px',
			data: {modalName: modalName, modalData: modalData}
		});
	}

	// onEdit(formType: any) {
	// 	if(formType === 'theme') {
	// 		this.modalType = 'theme';
	// 	}
	// }

	// closeDialog() {

	// }

	// onUpdateTheme(formType: any) {

	// }



}
