import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from 'src/app/_services/api.service';
import { MatDialog } from "@angular/material/dialog";
import { SelectionModel } from "@angular/cdk/collections";
import { ValetTokensDialogComponent } from './valet-tokens-dialog/valet-tokens-dialog.component';
import * as $ from "jquery";

export interface IValetToken {
	name: string;
	serialNumber: string;
	qrCodeId: string;
	action: string;
}

@Component({
	selector: 'app-valet-tokens',
	templateUrl: './valet-tokens.component.html',
	styleUrls: ['./valet-tokens.component.css']
})
export class ValetTokensComponent implements OnInit {

	dataSource = new MatTableDataSource<IValetToken>();
	selection = new SelectionModel<IValetToken>(true, []);
	displayedColumns: string[] = ['no', 'name', 'serialNumber', 'qrCodeId', 'action'];
	pageNo: number | undefined;
	entryLimit: number | undefined;
	isLoading: boolean = true;
	report: any = {};
	selectedRestaurant = JSON.parse(localStorage.getItem('selected_restaurant')!);
	selectedBranch = JSON.parse(localStorage.getItem('selected_branch')!);

	@ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
		this.dataSource.paginator = paginator
	}
	@ViewChild(MatSort) set matSort(sort: MatSort) {
		this.dataSource.sort = sort;
	}

	/** Return True or false */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach((row) => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: IValetToken): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
	}

	constructor(
		public apiService: ApiService,
		public dialog: MatDialog,) { }

	ngOnInit(): void {
		this.pageNo = 1;
		this.entryLimit = 10;
		this.getValetTokensList();
	}

	getValetTokensList() {
		this.apiService.VALET_TOKEN_LIST({ branch_id: this.selectedBranch._id }).subscribe((result: any) => {
			console.log('result:', result);
			if (result.status) {
				this.isLoading = false;
				this.dataSource.data = result.data;
			}
		});
	}

	applyFilter(filterValue: String) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	openDialog(x: any, y: any) {
		let dialogref = this.dialog.open(ValetTokensDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			width: '750px',
			height: 'auto',
			data: { x: x, y: y }
		});

		dialogref.afterClosed().subscribe((res) => {
			this.getValetTokensList();
		});

	}

	saveAsImage(parent: any, x: any) {
		//fetches base 64 date from image
		let parentSrc = "#QR" + parent;
		console.log("parent:", parentSrc);
		//const parentElement = $("#parent1").find("img").attr("src");
		const parentElement = $(parentSrc).find("img").attr("src");
		console.log("parentElement:", parentElement);

		// converts base 64 encoded image to blobData
		let blobData = this.convertBase64ToBlob(parentElement);

		// saves as image
		if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
			window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
		} else { // chrome
			const blob = new Blob([blobData], { type: "image/png" });
			const url = window.URL.createObjectURL(blob);
			// window.open(url);
			const link = document.createElement('a');
			link.href = url;
			link.download = x.access_code;
			link.click();
		}
	}

	private convertBase64ToBlob(Base64Image: any) {
		// Split into two parts
		const parts = Base64Image.split(';base64,');
		// Hold the content type
		const imageType = parts[0].split(':')[1];
		// Decode Base64 string
		const decodedData = window.atob(parts[1]);
		// Create UNIT8ARRAY of size same as row data length
		const uInt8Array = new Uint8Array(decodedData.length);
		// Insert all character code into UINT8ARRAY
		for (let i = 0; i < decodedData.length; i++) {
			uInt8Array[i] = decodedData.charCodeAt(i);
		}
		// Return Blob Image after conversion
		return new Blob([uInt8Array], { type: imageType });
	}
}
