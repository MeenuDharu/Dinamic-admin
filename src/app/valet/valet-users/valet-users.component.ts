import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { ApiService } from 'src/app/_services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ValetUsersDialogComponent } from './valet-users-dialog/valet-users-dialog.component';

export interface IValetUser {
	name: string;
	username: string;
}

@Component({
	selector: 'app-valet-users',
	templateUrl: './valet-users.component.html',
	styleUrls: ['./valet-users.component.css']
})
export class ValetUsersComponent implements OnInit {

	dataSource = new MatTableDataSource<IValetUser>();
	selection = new SelectionModel<IValetUser>(true, []);
	displayedColumns: string[] = ['no', 'name', 'username', 'action'];
	pageNo: number | undefined;
	entryLimit: number | undefined;
	isLoading: boolean = true;
	report: any = {};
	selectedRestaurant = JSON.parse(localStorage.getItem('selected_restaurant')!);
	selectedBranch = JSON.parse(localStorage.getItem('selected_branch')!);

	@ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
		this.dataSource.paginator = paginator;
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
	checkboxLabel(row?: IValetUser): string {
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
		this.getValetUsersList();
	}

	getValetUsersList() {
		this.apiService.VALET_USER_LIST({ branch_id: this.selectedBranch._id }).subscribe((result) => {
			console.log('valet users list:', result);

		})
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	openDialog(x: any, y: any) {
		console.log('x:', x, 'y:', y);
		let dialogref = this.dialog.open(ValetUsersDialogComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			width: '750px',
			height: 'auto',
			data: { x: x, y: y }
		});

		dialogref.afterClosed().subscribe((res) => {
			this.getValetUsersList();
		});
	}

}
