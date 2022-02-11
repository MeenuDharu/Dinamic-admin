import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../_services/api.service';

export interface UsersData {
	name: string;
	id: number;
}
@Component({
	selector: 'app-table-dialog',
	templateUrl: './table-dialog.component.html',
	styleUrls: ['./table-dialog.component.css']
})
export class TableDialogComponent implements OnInit {
	action: string;
	local_data: any;
	pos_floor_list: any = [];
	pos_table_list: any = [];
	table_list: any = [];
	addForm: any = {}; editForm: any = {};
	excelForm: any = {};
	tableName: string = ''; deleteId: any = '';
	selectedRestaurant: any = JSON.parse(localStorage.getItem('selected_restaurant')!);
	selectedBranch: any = JSON.parse(localStorage.getItem('selected_branch')!);
	isChecked: any;
	table_status: any;
	formType: any;
	locationType: any;
	table_floor_name: any;
	pos_floor_id: any;
	addForm_array: any = [];


	constructor(public dialogRef: MatDialogRef<TableDialogComponent>,
		//@Optional() is used to prevent error if no data is passed
		@Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData, public apiService: ApiService) {
		this.local_data = data;
		this.action = this.local_data.action;
	}

	ngOnInit(): void {
		console.log('type of rest id table', typeof this.selectedRestaurant._id)
		this.addForm = {};
		this.excelForm = {};
		this.formType = this.local_data.x;
		let x = this.local_data.y;

		this.apiService.TABLE_LIST({ branch_id: this.selectedBranch._id }).subscribe(result => {
			if (this.formType === 'tableEdit') {
				this.editForm.pos_restaurant_id = this.selectedRestaurant.pos_rest_id;
				this.editForm.pos_branch_id = this.selectedBranch.pos_branch_id;
				this.editForm._id = x._id;
				this.editForm.pos_floor_id = x.pos_floor_id;
				this.editForm.pos_table_id = x.pos_table_id;
				this.editForm.type = x.type;
				this.editForm.name = x.name;
				this.editForm.table_api = x.table_api;
			}
			else if (this.formType === 'tableDelete') {
				this.deleteId = x._id
			}
			this.addForm = {};
			this.apiService.POS_FLOOR_LIST({ pos_branch_id: this.selectedBranch.pos_branch_id }).subscribe(result => {
				console.log("Pos restaurant Floor............", result);
				if (result) {
					this.pos_floor_list = result.table_plans
				}

			});

			if (result.status) {
				result.data.forEach((element: any) => {
					element.access_code1 = "https://dqr.app/#/q/" + element.access_code;

				});
				this.table_list = result.data;
				console.log("this.table_list-------------", this.table_list)
			}
		});

	}

	onOptionsSelected(event: any) {
		const value = event.target.value;
		this.pos_floor_id = event.target.value;
		this.apiService.POS_TABLE_LIST({ pos_floor_id: event.target.value }).subscribe(result => {
			console.log("Pos restaurant Floor............", result[0].tables_list);

			console.log("this.table_list1............", this.table_list);
			if (result) {

				let a = this.table_list;
				let b = result[0].tables_list;

				b = b.filter(function (item: any) {
					for (var i = 0, len = a.length; i < len; i++) {
						if (a[i].pos_table_id == item.table_id) {
							return false;
						}
					}
					return true;
				})
				.sort((a: any,b: any) => a.table_name.toLowerCase() > b.table_name.toLowerCase() ? 1 : -1);
				this.pos_table_list = b;
			}

			if (this.pos_table_list.length) {
				this.addForm_array = [];
				this.pos_table_list.forEach((table: any) => {
				this.addForm.floor_name = this.table_floor_name;
				this.addForm.restaurant_id = this.selectedRestaurant._id;
				this.addForm.branch_id = this.selectedBranch._id;
				this.addForm.pos_floor_id = this.pos_floor_id;
				this.addForm.pos_restaurant_id = this.selectedRestaurant.pos_rest_id;
				this.addForm.pos_branch_id = this.selectedBranch.pos_branch_id;
				this.addForm.tablestatus = true;
				this.addForm.type = this.locationType;
					this.addForm.pos_table_id = table.table_id;
					this.addForm.table_api = "/detail/tables/" + table.table_id;
					this.addForm.name = table.table_name;
					this.addForm_array.push(this.addForm);
					this.addForm = {};
				})
				console.log('addForm ', this.addForm);
				console.log('addForm Array ',this.addForm_array);
			}


		});

	}

	onOptionsSelected1(event: any) {

		this.addForm.pos_table_id = event.target.value;
		this.addForm.table_api = "/detail/tables/" + event.target.value;
		let name;
		this.pos_table_list.filter(function (item: any) {
			if (item.table_id === event.target.value) {
				console.log("item..............", item);
				//  this.addForm.pos_rest_id = value; 
				// this.addForm['name'] = item.name;
				name = item.table_name;
				//  location = item.location;

			}
		});
		this.addForm.name = name;
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
			if (result.status) {
				this.doAction();
			}
		});
	}

	onAddTable() {
		// this.addForm.restaurant_id = this.selectedRestaurant._id;
		// this.addForm.branch_id = this.selectedBranch._id;
		// this.addForm.pos_restaurant_id = this.selectedRestaurant.pos_rest_id;
		// this.addForm.pos_branch_id = this.selectedBranch.pos_branch_id;
		// this.addForm.tablestatus = true;
		this.apiService.ADD_TABLE(this.addForm_array).subscribe(result => {
			if (result.status) {
				this.doAction();
			}
			else {
				this.addForm.error_msg = result.message;
			}
		});
	}

	onUpdateTable() {
		this.apiService.UPDATE_TABLE(this.editForm).subscribe(result => {
			console.log("result of edit..........", result)
			if (result.status) {
				this.doAction();
			}
			else {
				this.editForm.error_msg = result.message;
			}
		});
	}

	onDeleteTable() {
		this.apiService.DELETE_TABLE({ '_id': this.deleteId }).subscribe(result => {
			if (result.status) {
				this.doAction();
			}
		});
	}

	onExportExcel() {
		console.log(this.excelForm);
		this.dialogRef.close({event: this.formType, data: this.excelForm});
	}

	doAction() {
		this.dialogRef.close({ event: this.formType, data: this.local_data })
	}

	closeDialog() {
		this.dialogRef.close({ event: 'Cancel' });
	}

}
