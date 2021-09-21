import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    owner_id: number;
    first_name: string;
    last_name: string;
    address: string;
    town: string;
    email: string;
    mobile: string;
}

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(public dialogRefCst: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.data.owner_id = Number(this.genRandNo());
  }

  onNoClick(): void {
    this.dialogRefCst.close();
  }

  genRandNo(){
    return (Math.random() *1000).toFixed(0);
  }

}
