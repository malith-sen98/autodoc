import { Component, Inject, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MAT_DIALOG_DATA,MatDialogConfig,MatDialogRef} from '@angular/material/dialog';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-editinventory',
  templateUrl: './editinventory.component.html',
  styleUrls: ['./editinventory.component.css']
})
export class EditinventoryComponent implements OnInit {
st_id:any;
inventory_details : any=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditinventoryComponent>, public service:InventoryService  ) { }
 
  item_id:any;
  item_type:string="";
  item_name:string="";
  quantity:any;
  price:any;
  station_id=1;
  item1_id:any;
  ngOnInit(): void {
     
    this.retvInventoryEdit();
    
  }

  retvInventoryEdit() {
    this.service.GetInv1(this.data.station_id, this.data.item1_id)
      .subscribe(
        (data) => {
          this.inventory_details = data[0]; 
          this.item_type = this.inventory_details.item_type;
          this.item_id = this.inventory_details.item_id;
          this.item_name = this.inventory_details.item_name;
          this.quantity = this.inventory_details.quantity;
          this.price = this.inventory_details.price;
          
          

        },
        error => console.log('inventory details error!!', error)

      );
  }

  retvInventory(): void {
    this.service.GetInven(this.st_id)
      .subscribe(
        (data) => {
          this.inventory_details = data; // owner's name and stuff
          console.log(this.inventory_details);
        },
        error => console.log('inventory details error!!', error)

      );
  }

  

  onsubmit_check() {

    let arr = [this.item_id, this.item_type, this.item_name, this.quantity, this.price, this.data.station_id];
    console.log(arr);
    this.service.updateinv(arr)
      .subscribe(
        (data) => {
          console.log('successfully updated!!', data)
          
          this.retvInventory();


        },
        error => console.log('inventory details error!!', error)

      );
      this.dialogRef.close();

  }

}
