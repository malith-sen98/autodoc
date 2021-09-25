import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Pipe } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { AddinventoryComponent } from '../addinventory/addinventory.component';
import { EditinventoryComponent } from '../editinventory/editinventory.component';

import { StationService } from 'src/app/stationService/station.service';
import { AccountService } from 'src/app/services';



export interface DialogData{
  animal: 'panda' | 'unicorn' | 'lion';
}

export interface PeriodicElement {
  name: string;
  position: number;
  availability: string;
  cost: number;
  price: number;
  id: number;
  category: string;
  
  
}

class updatedInv {
  name?: string;
  availability?: string;
  price?: number;
  id?: number;
  category?: string;
  quantity?: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InventoryComponent implements OnInit {
  inventory_details : any=[];
  inventory : any=[];
  inventory_delete:any=[];

  item_type:any;
  searchedKeyword!: string;
  
  
  st_id:any;////////////////////

  inv_updated_item: Array<updatedInv> = [];
  

  displayedColumns: string[] = ['position', 'id', 'availability', 'category', 'cost', 'price', 'edit', 'delete'];
  dataSource = ELEMENT_DATA;

  value = '';
  constructor( private _stationServiceVariable:StationService,private _accountServiceVariable:AccountService,public dialog: MatDialog,public service:InventoryService) {}

  openDialog() {
   
    
    //this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRefSer = this.dialog.open(AddinventoryComponent,dialogConfig);
    dialogRefSer.afterClosed().subscribe((result) => {
    console.log("Hello")
    this.inventory_details = [];
    this.inv_updated_item = [];
    this.retvInventory();
    });
  }
  opendialog2(item_id: any) {
    
    const dialogRef = this.dialog.open(EditinventoryComponent, {
      data: {
        item1_id: item_id,
        station_id: this.st_id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("Hello")
      this.inventory_details = [];
      this.inv_updated_item = [];
      this.retvInventory();
      });

  }
  
  
 

  ngOnInit(): void {

    this.get_station_id();

    // this.retvInventory();
    // console.log(this.inventory_details,"eliyen");
    // console.log(this.inventory_details.length,"length");
     
  }

  get_station_id(){
    console.log(this._accountServiceVariable.accountValue,"acccccc");
    let user_email = this._accountServiceVariable.accountValue.email;

    this._stationServiceVariable.get_station_id( user_email )
    .subscribe(
      data=> {this.st_id = data[0].st_id;              
        console.log(this.st_id,"user id ???????");
            this.retvInventory();
            console.log(this.inventory_details,"eliyen");
            console.log(this.inventory_details.length,"length");
    
      },
      error=> console.log('get user id error!',error)      
    );
  }


  final(){
    //console.log(this.inventory_details)

    for(let x of this.inventory_details)
    {
      console.log('methana');
      
      if(x.quantity <= 10)
      {
          let y: updatedInv ={
            name: x.item_name,
            availability: 'Reorder',
            price: x.price,
            id: x.item_id,
            category: x.item_type,
            quantity: x.quantity
          }
        this.inv_updated_item.push(y);
      }
      else{
        let y: updatedInv ={
          name: x.item_name,
          availability: 'Available',
          price: x.price,
          id: x.item_id,
          category: x.item_type,
          quantity: x.quantity
        }
      this.inv_updated_item.push(y);
      }

    }
  
  }

    
      
  retvInventory( ):void{
    this.service.GetInven(this.st_id)
    .subscribe(
      (data)=> {this.inventory_details = data ; 
        console.log(this.inventory_details);
        this.final();
      },
      error=>console.log('vehicle details error!!',error)

      );
  }

  delete(delete_item_Id: any) {
    if (confirm('Are you sure?')) {
    console.log(delete_item_Id);
    this.service.deleteuser(delete_item_Id)
      .subscribe(
        (data) => {
          this.inventory_delete = data;
          
          console.log(this.inventory_delete);
          this.inventory_details = [];
          this.inv_updated_item = [];
          this.retvInventory();

        },
        
        error => console.log('inventory details deleted!!', error)

      );
  }
}

}
 




