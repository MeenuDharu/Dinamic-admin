import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SelectionModel } from '@angular/cdk/collections';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import * as $ from 'jquery';


export interface branchData {
	name: string;
	qr_count: string;
	nfc_count: String;
	access_code: String;
	access_code1: String;
	action: any;
}
@Component({
	selector: 'app-tables',
	templateUrl: './tables.component.html',
	styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
	table_list: any = [];
	public dataSource = new MatTableDataSource<branchData>();
	selection = new SelectionModel<branchData>(true, []);
	dataArray: any = [];
	isLoading = true;
	report: any = {};
	addForm: any = {}; editForm: any = {};
	tableName: string = ''; deleteId: any = '';
	selectedRestaurant: any = JSON.parse(localStorage.getItem('selected_restaurant')!);
	selectedBranch: any = JSON.parse(localStorage.getItem('selected_branch')!);
	isChecked: any;
	table_status: any;
	displayedColumns: string[] = ['no', 'name', 'qr_count', 'nfc_count', 'access_code', 'action'];
	pageNo: any; entryLimit: any; directoryName: any; mkid: any;
	@ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
		this.dataSource.paginator = paginator;
	}
	@ViewChild(MatSort) set MatSort(sort: MatSort) {
		this.dataSource.sort = sort;
	}



	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: branchData): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
	}

	constructor(private router: Router, private apiService: ApiService, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.pageNo = 1;
		this.entryLimit = 10;
		this.tableList();
	}

	tableList() {
		this.dataArray = [];
		this.apiService.TABLE_LIST({ branch_id: this.selectedBranch._id }).subscribe(result => {
			console.log("result data..........", result)
			if (result.status) {
				this.table_list = result.data;
				this.isLoading = false;
				for (let i = 0; i < this.table_list.length; i++) {
					let data: any = {};
					data["name"] = this.table_list[i].name;
					data["qr_count"] = this.table_list[i].qr_count;
					data["nfc_count"] = this.table_list[i].nfc_count;
					data["tablestatus"] = this.table_list[i].tablestatus;
					data["access_code"] = this.table_list[i].access_code;
					data["access_code1"] = "https://dqr.app/#/q/" + this.table_list[i].access_code;
					data['i'] = i + 1;
					data["$key"] = this.table_list[i]._id;
					data["_id"] = this.table_list[i]._id;
					data["pos_floor_id"] = this.table_list[i].pos_floor_id;
					data["pos_table_id"] = this.table_list[i].pos_table_id;
					data["type"] = this.table_list[i].type;
					data["table_api"] = this.table_list[i].table_api;
					this.dataArray.push(data);
				}
				this.dataSource.data = this.dataArray as branchData[];
			}
		});

	}
	ngAfterViewInit(): void {
		// this.dataSource.sort = this.sort;
		// this.dataSource.paginator = this.paginator;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	saveAsImage(parent: any, x: any) {
		// fetches base 64 date from image
		let parentSrc = "#QR" + parent;
		console.log("parent...............", parentSrc)
		//const parentElement = $("#parent1").find("img").attr("src"); 
		const parentElement = $(parentSrc).find("img").attr("src");
		console.log("parentElement.........", parentElement)

		// converts base 64 encoded image to blobData
		let blobData = this.convertBase64ToBlob(parentElement);

		// saves as image
		if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
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
		// SPLIT INTO TWO PARTS
		const parts = Base64Image.split(';base64,');
		// HOLD THE CONTENT TYPE
		const imageType = parts[0].split(':')[1];
		// DECODE BASE64 STRING
		const decodedData = window.atob(parts[1]);
		// CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
		const uInt8Array = new Uint8Array(decodedData.length);
		// INSERT ALL CHARACTER CODE INTO UINT8ARRAY
		for (let i = 0; i < decodedData.length; ++i) {
			uInt8Array[i] = decodedData.charCodeAt(i);
		}
		// RETURN BLOB IMAGE AFTER CONVERSION
		return new Blob([uInt8Array], { type: imageType });
	}

	transform(items: any[], value: string): any[] {
		if (!items) return [];
		if (!value || value.length == 0) return items;
		let columns: any = [];
		if (items.length) columns = Object.keys(items[0]);
		if (!columns.length) return columns;
		return items.filter(function (d) {
			for (let i = 0; i <= columns.length; i++) {
				const column = columns[i];
				if (d[column] && d[column].toString().toLowerCase().indexOf(value) > -1) return true;
			}
		});
	}

	exportAsXLSX(): void {
		let customsearch;
		if (this.report.cussearch) {
			customsearch = this.report.cussearch.trim();
		}
		else {
			customsearch = this.report.cussearch;
		}
		let filterList = this.transform(this.dataArray, customsearch);
		//  this.excelService.exportAsExcelFile(filterList, 'Mailreport'); 
	}


	checkValue(event: any, id: any) {
		console.log(event);
		console.log(event.target.checked)
		if (event.target.checked) {
			this.table_status = 'active'
		}
		else {
			this.table_status = 'inactive'
		}
		this.apiService.UPDATE_TABLESTATUS({ '_id': id, 'table_status': this.table_status, status: event.target.checked }).subscribe(result => {
			console.log("result", result)
			if (result.status1) {
				this.ngOnInit();
			}
		});
	}


	openDialog(x: any, y: any) {
		console.log('x:', x, 'y:', y);
		let dialogref = this.dialog.open(TableDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			width: '750px',
			height: 'auto',
			data: { x: x, y: y }
		});

		dialogref.afterClosed().subscribe((res) => {
			this.tableList();
		});

	}
}