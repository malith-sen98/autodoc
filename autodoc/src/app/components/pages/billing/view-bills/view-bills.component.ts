import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

//Import Services
import { BillingService } from '../../../../services';

//Import Models
import { Bill } from '../../../../models';

export interface PeriodicElement {
  id: number;
  description: string;
  amount: number;
  date: string;
  ownerid: number;
  appid: number;
  customertype: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {position: 1, id: 'INV0001', name: 'Havoline', availability: 100, category: 'Engine Oil', cost: 100, price: 150},
  // {position: 2, id: 'INV0002', name: 'Havoline', availability: 100, category: 'Engine Oil', cost: 100, price: 150},
];

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css'],
})
export class ViewBillsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'amount',
    'date',
    'ownerid',
    'appid',
    'customertype',
    'description',
    'delete',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  billLists?: Bill[];
  deleting = false;
  datePickerDate = moment().format('YYYY-MM-DD');
  todDate;

  value = '';
  path = "../../../../../assets/invoice/";

  constructor(private _bill: BillingService) {}

  ngOnInit(): void {
    this.getBills();
  }

  getBills(): void {
    let datefil;
    this._bill.getBills().subscribe(
      (data: any) => {
        this.billLists = data;
        for (let a of data) {
          datefil = moment(a.date).format('YYYY-MM-DD');
          ELEMENT_DATA.push({
            id: a.bill_id,
            description: a.description,
            amount: a.amount,
            date: datefil,
            ownerid: a.owner_id,
            appid: a.appointment_id,
            customertype: a.type
          });
        }
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBillsbyDate(): void {
    let datefil;
    this._bill.getBills().subscribe(
      (data: any) => {
        this.billLists = data;
        for (let a of data) {
          datefil = moment(a.date).format('YYYY-MM-DD');
          if(datefil == this.todDate){
          ELEMENT_DATA.push({
            id: a.bill_id,
            description: a.description,
            amount: a.amount,
            date: datefil,
            ownerid: a.owner_id,
            appid: a.appointment_id,
            customertype: a.type
          });
        }
      }
        this.dataSource._updateChangeSubscription();
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openBill(elm){
    let fileURL
    if(elm.customertype == 'normal_customer')
    {
      fileURL = this.path+elm.id+".pdf";
    }
    else{
      fileURL = this.path+elm.appid+".pdf";
    }
    
    window.open(fileURL, '_blank');
  }

  delete(elm) {
    console.log(elm);
    if (confirm('Are you sure?')) {
      const index = this.dataSource.data.indexOf(elm);
      this.dataSource.data.splice(index, 1);
      this.deleting = true;
      this._bill
        .delete(elm.id)
        .subscribe(() => {
          console.log('Invoice deleted successfully');
          
        });
    }
    this.dataSource._updateChangeSubscription();
  }

  OnDateChange(event) {
    let count = 0;
    for (let i of this.dataSource.data) {
      count = count + 1;
    }
    console.log(count);
    this.dataSource.data.splice(0, count);
    this.dataSource._updateChangeSubscription();
    this.todDate = moment(event).format('YYYY-MM-DD');
    console.log(this.todDate);
    this.getBillsbyDate();
  }
}
