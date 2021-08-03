import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from 'src/app/_services/api.service';

export interface IValetTokenDialog {
	name: string;
	_id: string;
}

@Component({
	selector: 'app-valet-tokens-dialog',
	templateUrl: './valet-tokens-dialog.component.html',
	styleUrls: ['./valet-tokens-dialog.component.css']
})
export class ValetTokensDialogComponent implements OnInit {

	formType: any;
	localData: any;
	addForm: any = {};
	editForm: any = {};
	deleteId: any = '';
	tableName: any;
	selectedRestaurant = JSON.parse(localStorage.getItem('selected_restaurant')!);
	selectedBranch = JSON.parse(localStorage.getItem('selected_branch')!);

	constructor(
		public dialogRef: MatDialogRef<ValetTokensDialogComponent>,
		//@Optional() is used to prevent error if no data is passed
		@Optional() @Inject(MAT_DIALOG_DATA) public valetTokenData: IValetTokenDialog,
		public apiService: ApiService) {
		console.log('dialogData:', valetTokenData);
		this.localData = valetTokenData;
	}

	ngOnInit(): void {
		this.addForm = {};
		this.formType = this.localData.x;
		let x = this.localData.y;
		if (this.formType === 'edit') {
			this.editForm._id = x._id;
			this.editForm.serial_number = x.serial_number;
			this.editForm.pos_rest_id = this.selectedRestaurant.pos_rest_id;
			this.editForm.pos_branch_id = this.selectedBranch.pos_branch_id;
		} else if (this.formType === 'delete') {
			this.deleteId = x._id;
		}
	}

	onAddValetToken() {
		this.addForm.restaurant_id = this.selectedRestaurant._id;
		this.addForm.branch_id = this.selectedBranch._id;
		this.addForm.pos_restaurant_id = this.selectedRestaurant.pos_rest_id;
		this.addForm.pos_branch_id = this.selectedBranch.pos_branch_id;
		this.apiService.ADD_VALET_TOKEN(this.addForm).subscribe((result) => {
			console.log('add valet:', result);
			if (result.status) {
				this.doAction();
			} else {
				this.addForm.error_msg = result.message;
			}
		});
	}

	onUpdateValetToken() {
		this.apiService.UPDATE_VALET_TOKEN(this.editForm).subscribe((result) => {
			console.log('valet token update:', result);
			if (result.status) {
				this.doAction();
			} else {
				this.editForm.error_msg = result.message;
			}
		});
	}

	onDeleteValetToken() {
		console.log('delete id', this.deleteId);
		this.apiService.DELETE_VALET_TOKEN({ '_id': this.deleteId }).subscribe((result) => {
			if (result.status) {
				this.doAction();
			}
		})
	}

	doAction() {
		this.dialogRef.close({ event: this.formType, data: this.localData });
	}

	closeDialog() {
		this.dialogRef.close({ event: 'cancel' });
	}

}
