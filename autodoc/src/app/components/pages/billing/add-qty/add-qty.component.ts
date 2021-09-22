import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

//Import Services
import {
  InventoryService,
} from '.././../../../services';

//Import Models
import {
  InventoryItem,
} from '../../../../models';

export interface DialogData {
  itmid: number;
  itemname: string;
  qnty: number;
  listitem: Array<InventoryItem>;
  itmpr: number;
}

class itemCat{
  itemid: number;
  itemtypename: string;
  itemtypeprc: number;
}

@Component({
  selector: 'app-add-qty',
  templateUrl: './add-qty.component.html',
  styleUrls: ['./add-qty.component.css']
})
export class AddQtyComponent implements OnInit {
  invCatItems: Array<itemCat> = [];

  constructor(public dialogRefQty: MatDialogRef<AddQtyComponent>,private _inv: InventoryService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.data.qnty = 0;
    this.checkItembyCat();
  }

  onNoClick(): void {
    this.dialogRefQty.close();
  }

  checkItembyCat(){
    for(let itm of this.data.listitem)
    {
      if(this.data.itemname == itm.item_type){
        let im: itemCat = {
          itemid: itm.item_id,
          itemtypename: itm.item_name,
          itemtypeprc: itm.price
        };
        this.invCatItems.push(im);
      }
    }
  }

  // checkDisabled(nm, state): boolean {
  //   for(let a of this.data.listitem)
  //   {
  //     if (a.item_name == nm) return state;
  //   }
  // }

  saveBtn(it, pr, itid){
    this.data.itemname = it;
    this.data.itmpr = pr;
    this.data.itmid = itid;
  }

  checkDisabled(sername, state): boolean {
      if (this.data.itemname == sername) return state;
  }

}
