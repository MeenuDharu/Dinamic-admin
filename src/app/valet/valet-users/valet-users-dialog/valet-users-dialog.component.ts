import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from 'src/app/_services/api.service';

export interface IValetUserDialog {
	name: string;
	_id: string;
}

@Component({
  selector: 'app-valet-users-dialog',
  templateUrl: './valet-users-dialog.component.html',
  styleUrls: ['./valet-users-dialog.component.css']
})
export class ValetUsersDialogComponent implements OnInit {

  formType:any;
	localData: any;
	addForm:any = {};
	pwdForm:any = {};
	deleteId: any = '';
	tableName: any;
	selectedRestaurant = JSON.parse(localStorage.getItem('selected_restaurant')!);
	selectedBranch = JSON.parse(localStorage.getItem('selected_branch')!);

	constructor(
		public dialogRef: MatDialogRef<ValetUsersDialogComponent>,
		//@Optional() is used to prevent error if no data is passed
		@Optional() @Inject(MAT_DIALOG_DATA) public valetUserData: IValetUserDialog,
		public apiService: ApiService) {
			console.log('dialogData:', valetUserData);
			this.localData = valetUserData;
	}

  ngOnInit(): void {
    this.addForm = {};
		this.formType = this.localData.x;
		let x = this.localData.y;
		if(this.formType === 'lock') {
			this.pwdForm._id = x._id;
			this.pwdForm.name = x.name;
		} else if(this.formType === 'delete') {
			this.deleteId = x._id;
		}
  }

  onAddUserToken(){
    this.addForm.restaurant_id = this.selectedRestaurant._id;
		this.addForm.branch_id = this.selectedBranch._id;
		this.addForm.pos_restaurant_id = this.selectedRestaurant.pos_rest_id;
		this.addForm.pos_branch_id = this.selectedBranch.pos_branch_id;
		this.apiService.ADD_VALET_USER(this.addForm).subscribe((result) => {
			console.log('add valet:', result);
      if(result.status){
        this.closeDialog();
      } else {
        this.addForm.error_msg = result.message;
      }
		});
  }

  onResetPwd(){
    this.apiService.VALET_USER_RESET_PWD(this.pwdForm).subscribe((result) => {
      if(result.status){
        this.closeDialog();
      } else {
        this.pwdForm.error_msg = result.message;
      }
    });
  }

  closeDialog() {
		this.dialogRef.close({event: 'Cancel'});
	}

}
