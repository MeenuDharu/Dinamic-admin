import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../_services/api.service';

export interface UsersData {
	name: string;
	id: number;
}

@Component({
	selector: 'app-branch-dialog',
	templateUrl: './branch-dialog.component.html',
	styleUrls: ['./branch-dialog.component.css']
})

export class BranchDialogComponent implements OnInit {
	branch_list: any = [];
	action: string;
	local_data: any;
	pos_branch_list: any = [];
	addForm: any = {}; editForm: any = {}; paymentForm: any = {};
	branchLocation: string = ''; deleteId: any = '';
	tableName: any = '';
	restaurant_search: any;
	selectedRestaurant: any = JSON.parse(localStorage.getItem('selected_restaurant')!);
	formType: any;
	constructor(public dialogRef: MatDialogRef<BranchDialogComponent>,
		//@Optional() is used to prevent error if no data is passed
		@Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData, public apiService: ApiService) {
		console.log('branch dialog data: ',data);
		this.local_data = data;
		this.action = this.local_data.action;
	}

	ngOnInit(): void {
		this.apiService.BRANCH_LIST({ restaurant_id: this.selectedRestaurant._id }).subscribe(result => {
			if (result.status) {
				this.branch_list = result.data;
				this.addForm = {};
				this.formType = this.local_data.x;
				let x = this.local_data.y;
				if (this.formType === 'edit') {
					this.editForm.pos_restaurant_id = this.selectedRestaurant.pos_rest_id;
					this.editForm._id = x._id;
					this.editForm.location = x.location;
					this.editForm.manager_name = x.manager_name;
					this.editForm.mobile = x.mobile;
					this.editForm.email = x.email;
					this.editForm.address = x.address;
				} else if (this.formType === 'payment') {
					this.apiService.GET_GATEWAY({_id: this.local_data.y._id}).subscribe((result) => {
						if (result.status) {
							this.paymentForm = result.data;
						}
					});
					this.paymentForm._id = x._id;
					this.paymentForm.branch_id = x._id;
					this.paymentForm.restaurant_id = this.selectedRestaurant._id;
					this.paymentForm.pos_rest_id = this.selectedRestaurant.pos_rest_id;
					this.paymentForm.pos_branch_id = this.local_data.y.pos_branch_id;
				} else if (this.formType === 'delete') {
					this.deleteId = x._id;
				}
				this.apiService.POS_BRANCH_LIST({ pos_restaurant_id: this.selectedRestaurant.pos_rest_id }).subscribe(result => {
					console.log("pos branch list..........", result, "rest......", this.selectedRestaurant.pos_rest_id);
					let a = this.branch_list;
					let b = result.branch_list;

					b = b.filter(function (item: any) {
						for (var i = 0, len = a.length; i < len; i++) {
							if (a[i].pos_branch_id == item._id) {
								return false;
							}
						}
						return true;
					});
					this.pos_branch_list = b

				});
			}
		});
	}

	pos_branchList() {

		//  modalName.show();
	}


	onOptionsSelected(event: any) {
		this.addForm = {};
		const value = event.target.value;
		let name, location;
		this.pos_branch_list.filter(function (item: any) {
			if (item._id === value) {
				console.log("item..............", item);
				//  this.addForm.pos_rest_id = value; 
				// this.addForm['name'] = item.name;
				name = item.name;
				location = item.location;

			}
		});
		this.addForm.name = name;
		this.addForm.location = name;
		this.addForm.address = location;
		this.addForm.pos_branch_id = event.target.value;
		this.editForm.pos_branch_id = event.target.value;

		console.log(this.addForm.name);
	}

	onAddBranch() {
		this.addForm.restaurant_id = this.selectedRestaurant._id;
		this.apiService.ADD_BRANCH(this.addForm).subscribe(result => {
			if (result.status) {
				this.ngOnInit();
				this.doAction();
			}
			else {
				this.addForm.error_msg = result.message;
			}
		});
	}

	onUpdateBranch() {
		this.apiService.UPDATE_BRANCH(this.editForm).subscribe(result => {
			if (result.status) {
				this.ngOnInit();
				this.doAction();
			}
			else {
				this.editForm.error_msg = result.message;
			}
		});
	}

	onUpdateGateway() {
		console.log("payment form...", this.paymentForm);
		this.apiService.UPDATE_GATEWAY(this.paymentForm).subscribe((result) => {
			if (result.status) {
				this.doAction();
			} else {
				this.paymentForm.error_msg = result.message;
			}
		})
	}

	onDeleteBranch() {
		this.apiService.DELETE_BRANCH({ '_id': this.deleteId }).subscribe((result) => {
			console.log("delete result: ", result)
			if (result.status) {
				this.doAction();
			}
		});
	}

	doAction() {
		this.dialogRef.close({ event: this.formType, data: this.local_data });
	}

	closeDialog() {
		this.dialogRef.close({ event: 'cancel' });
	}

}
