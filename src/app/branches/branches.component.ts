import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SelectionModel } from '@angular/cdk/collections';
import { BranchDialogComponent } from './branch-dialog/branch-dialog.component';

export interface branchData {
	no: string;
	location: string;
	manager_name: string;
	mobile: String;
	table_count: String;
	action: any;
}

@Component({
	selector: 'app-branches',
	templateUrl: './branches.component.html',
	styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
	branch_list: any = [];
	pos_branch_list: any = [];
	addForm: any = {}; editForm: any = {}; paymentForm: any = {};
	branchLocation: string = ''; deleteId: any = '';
	restaurant_search: any;
	selectedRestaurant: any = JSON.parse(localStorage.getItem('selected_restaurant')!);
	pageNo: any; entryLimit: any; directoryName: any; mkid: any;

	restData: any;
	public dataSource = new MatTableDataSource<branchData>();
	selection = new SelectionModel<branchData>(true, []);
	dataArray: any = [];
	isLoading = true;
	report: any = {};

	displayedColumns: string[] = ['no', 'location', 'manager_name', 'mobile', 'table_count', 'action'];

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
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.location + 1}`;
	}

	constructor(
		private router: Router,
		private apiService: ApiService,
		public dialog: MatDialog) { }

	ngOnInit(): void {
		this.pageNo = 1;
		this.entryLimit = 10;
		this.branchList();
	}

	branchList() {
		this.dataArray = [];
		this.apiService.BRANCH_LIST({ restaurant_id: this.selectedRestaurant._id }).subscribe(result => {
			console.log("result data..........", result)
			if (result.status) {
				this.branch_list = result.data;
				this.isLoading = false;
				for (let i = 0; i < this.branch_list.length; i++) {
					let data: any = {};
					data["location"] = this.branch_list[i].location;
					data["manager_name"] = this.branch_list[i].manager_name;
					data["mobile"] = this.branch_list[i].mobile;
					data["table_count"] = this.branch_list[i].table_count;
					data["$key"] = this.branch_list[i]._id;
					data["_id"] = this.branch_list[i]._id;
					data["pos_rest_id"] = this.branch_list[i].pos_rest_id;
					data["pos_branch_id"] = this.branch_list[i].pos_branch_id;
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

	openDialog(x: any, y: any) {
		let dialogref = this.dialog.open(BranchDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			width: '750px',
			height: 'auto',
			data: { x: x, y: y }
		});

		dialogref.afterClosed().subscribe((res) => {
			this.branchList();
		})

	}

	onTableList(x: any) {
		localStorage.setItem('selected_branch', JSON.stringify(x));
		this.router.navigate(['/tables']);
	}

	onValetList(x: any) {
		localStorage.setItem('selected_branch', JSON.stringify(x));
		this.router.navigate(['/valet-tokens']);
	}

}