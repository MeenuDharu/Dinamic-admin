import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from '../_services/api.service';

export interface IUser {
	name: string;
	email: string;
	mobile: string;
}

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	dataSource = new MatTableDataSource<IUser>();
	displayedColumns: string[] = ['no', 'name', 'mobile', 'email', 'created_on'];
	pageNo: number | undefined;
	entryLimit: number | undefined;
	report: any = {};
	isLoading: boolean = true;

	@ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
		this.dataSource.paginator = paginator;
	}
	@ViewChild(MatSort) set matSort(sort: MatSort) {
		this.dataSource.sort = sort;
	}

	constructor(public apiService: ApiService) { }

	ngOnInit(): void {
		this.pageNo = 1;
		this.entryLimit = 10;
		this.getUsersList();
	}

	getUsersList() {
		this.apiService.USER_LIST().subscribe((result) => {
			console.log('user list:', result);
			if (result.status) {
				this.isLoading = false;
				this.dataSource.data = result.data;
			}
		});
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}
