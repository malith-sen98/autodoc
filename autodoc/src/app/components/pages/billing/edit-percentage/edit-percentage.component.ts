import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogDataPerc {
  name: string;
  percentage: number;
}

@Component({
  selector: 'app-edit-percentage',
  templateUrl: './edit-percentage.component.html',
  styleUrls: ['./edit-percentage.component.css']
})
export class EditPercentageComponent implements OnInit {

  constructor(public dialogRefPer: MatDialogRef<EditPercentageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataPerc) { }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRefPer.close();
  }

}
