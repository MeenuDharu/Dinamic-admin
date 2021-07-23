import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { SelectionModel } from '@angular/cdk/collections';
import { RestaurentDialogComponent } from './restaurent-dialog/restaurent-dialog.component';

export interface restData {
	name: string;
	contact_person: string;
	mobile: String;
	branche_count: String;
	action: any;
}

@Component({
	selector: 'app-restaurent',
	templateUrl: './restaurent.component.html',
	styleUrls: ['./restaurent.component.css']
})

export class RestaurentComponent implements OnInit {
	restaurant_list: any = [];
	addForm: any = {}; editForm: any = {};
	restaurantName: string = ''; deleteId: any = '';
	pageNo: any; entryLimit: any; directoryName: any; mkid: any;
	pos_restaurant_list: any;
	restData: any;
	public dataSource = new MatTableDataSource<restData>();
	selection = new SelectionModel<restData>(true, []);
	dataArray: any = [];
	isLoading = true;
	report: any = {};

	displayedColumns: string[] = ['no', 'name', 'contact_person', 'mobile', 'branch_count', 'action'];

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
	checkboxLabel(row?: restData): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
	}

	constructor(
		private router: Router, 
		private apiService: ApiService, 
		public dialog: MatDialog) { }

	ngOnInit() {
		this.pageNo = 1;
		this.entryLimit = 10;
		this.restaurentList();
	}

	restaurentList() {
		this.dataArray = [];
		this.apiService.RESTAURANT_LIST().subscribe(result => {
			console.log("result data..........", result)
			if (result.status) {
				this.restaurant_list = result.data;
				this.isLoading = false;

				for (let i = 0; i < this.restaurant_list.length; i++) {

					let data: any = {};
					data["name"] = this.restaurant_list[i].name;
					data["contact_person"] = this.restaurant_list[i].contact_person;
					data["mobile"] = this.restaurant_list[i].mobile;
					data["branch_count"] = this.restaurant_list[i].branch_count;
					data["$key"] = this.restaurant_list[i]._id;
					data["_id"] = this.restaurant_list[i]._id;
					data["pos_rest_id"] = this.restaurant_list[i].pos_rest_id;
					data["email"] = this.restaurant_list[i].email;
					data["website"] = this.restaurant_list[i].website;
					data["base_url"] = this.restaurant_list[i].base_url;
					this.dataArray.push(data);
				}
				this.dataSource.data = this.dataArray as restData[];
			}
		});



		// this.apiService.marketing_campaignlist().subscribe(result => {
		//   console.log(result);
		//   this.isLoading = false;
		//   this.mkcamplist = result.campaignlist;

		//   for(let i=0; i<this.mkcamplist.length; i++)
		//   {

		//     let data = {};
		//     data["campaignname"] = this.mkcamplist[i].campaignname;
		//     data["category"] = this.mkcamplist[i].category;
		//     data["subcategory"] = this.mkcamplist[i].subcategory;
		//     data["datetime"] = this.mkcamplist[i].datetime;
		//     data["$key"] = this.mkcamplist[i]._id;
		//     data["_id"] = this.mkcamplist[i]._id;
		//     data["subject"] = this.mkcamplist[i].subject;
		//     this.dataArray.push(data);
		//   }
		//   this.dataSource.data = this.dataArray as restData[];   

		//   });  
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

	onBranchList(x: any) {
		localStorage.setItem('selected_restaurant', JSON.stringify(x));
		this.router.navigate(['/branches']);
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

	onChangeTheme(selectedRestaurantData : any) {
		localStorage.setItem('selected_restaurant', JSON.stringify(selectedRestaurantData));
		this.router.navigate(['/restaurent-theme']);
	}


	openDialog(x: any, y: any) {
		console.log('x:. ', x, 'y:. ', y)
		let dialogref = this.dialog.open(RestaurentDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			width: '750px',
			height: 'auto',
			data: { x: x, y: y }
		});

		dialogref.afterClosed().subscribe(res => {			
				console.log('res evnt....', res.event)
				this.restaurentList();					
		})
	}


}