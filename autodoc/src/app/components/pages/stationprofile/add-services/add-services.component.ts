import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

//Import Services
import {
  InventoryService,
} from '.././../../../services';

//Import Models
import {
  InventoryItem,
  ServiceFiltServs,
  ServiceFiltServsN,
  ServiceStationServices
} from '../../../../models';

export interface DialogData {
  listitem: Array<ServiceFiltServsN>;
  newlistitem: Array<ServiceFiltServsN>;
}

interface Group {
  name: string;
  selectedOption?: string;
}


@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {
  amut: number;
  dur: number;
  ser_name;
  newlis : Array<ServiceFiltServsN> = [];

  constructor(public dialogRefSer: MatDialogRef<AddServicesComponent>,private _inv: InventoryService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  valuechangeAmu(name) {
      this.amut = Number(name);
    }

  valuechangeDur(name,itm){
    this.dur= Number(name);
    let reqserv: ServiceFiltServsN = {
          service_id: itm.service_id,
          service_name: itm.service_name,
          amount: Number(this.amut),
          duration_hrs: Number(this.dur)
    };
        console.log(reqserv);
        this.newlis.push(reqserv);
        this.amut = 0.0;
        this.dur = 0.0;
        this.data.newlistitem = this.newlis;
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  onNoClick(): void {
    this.dialogRefSer.close();
    this.data.listitem = []
  }

  onOkClick(): void{
    this.data.listitem = [];
  }

}
