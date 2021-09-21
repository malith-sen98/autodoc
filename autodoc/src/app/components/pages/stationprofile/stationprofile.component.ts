import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddServicesComponent } from './add-services/add-services.component';

import {
  AppointmentService, AppointservicesService, BaysService, ServiceService, ServicestationservicesService, ServicestationService
} from './../../../services';

import {
  Appointment,
  AppointRows,
  AppointService,
  Service,
  ServiceFiltServs,
  ServiceStationServices,
  ServiceStation,
  Bay,
  ServiceFiltServsN,
  ReqStationServices,
  reqServ
} from '../../../models';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  service: string;
  position: number;
  vehicleNo: string;
  bay: number;
}

class bayWork {
  bayid: number;
  bayload: number;
}

const ELEMENT_DATA: PeriodicElement[] = [


];



@Component({
  selector: 'app-stationprofile',
  templateUrl: './stationprofile.component.html',
  styleUrls: ['./stationprofile.component.css']
})
export class StationprofileComponent {

  displayedColumns: string[] = ['position', 'service', 'bay', 'vehicleNo'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  AppointmentRows: AppointRows[];
  servicesListsFiltered?: Service[];
  newServiceFiltServsList: Array<ServiceFiltServsN> = [];
  addServiceFiltServsList: Array<ServiceFiltServsN> = [];
  servicesLists?: ServiceStationServices[];
  appServiceList?: AppointService[];
  app
  serStaId = 1;
  bayList;
  units = 18;
  wkbayList: bayWork[] = [];
  subscription: Subscription;
  subscriptionBay: Subscription;
  source = interval(100000);

  //Service Station profile
  serStatLists?: ServiceStation[];


  colorBay1: ThemePalette = 'primary';
  modeBay1: ProgressSpinnerMode = 'determinate';
  valueBay1 = 80;
  diameterBay1 = 300;
  count: number =0;

  constructor(
    private _appoin: AppointmentService,
    private _serv: ServiceService,
    private _servst: ServicestationservicesService,
    private _appser: AppointservicesService,
    private _bays: BaysService,
    private _stat: ServicestationService,
    public dialog: MatDialog,
    ){}
  ngOnInit(): void {
    this.retrieveApppots();
    this.retrieveServices();
    this.getBays();
    this.servStaionDet(this.serStaId);
    this.retrieveServicesById(this.serStaId);
    this.subscription = this.source.subscribe(val => this.retrieveApppots());
    this.subscriptionBay = this.source.subscribe(val => this.getBays());
  }


  
//Get Bays

getBays(){
  this.wkbayList = [];
  this._bays.getById(this.serStaId).subscribe(
    (data) => {
      this.bayList = data;
      console.log(data);
      for(let x of this.bayList)
      {
        let a: bayWork = {
          bayid: x.bay_id,
          bayload: 0
        }
        this.wkbayList.push(a);
      }
      this.calcBayWork();
    },
    (error) => {
      console.log(error);
    }
  );
}


  //Get Appointments

  retrieveApppots(): void {
    let count = 0;
    for (let i of this.dataSource.data) {
      count = count + 1;
    }
    this.dataSource.data.splice(0, count);
    this.dataSource._updateChangeSubscription();
    this._appoin.getAllbyId(this.serStaId).subscribe(
      (data: any) => {
        this.AppointmentRows = data;
        console.log(data);
        for(let x of this.AppointmentRows)
        {
          if(x.date == moment().format('YYYY-MM-DD'))
          {
            this.getAppServs(x.appointment_id,x); 
          }
            
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Get services for a perticular appointment
  getAppServs(id, x): void {
    this._appser.getServs(id).subscribe(
      (data) => {
        this.appServiceList = data;
        console.log(this.appServiceList);
        //this.addElm(x)
        this.befFunc(x);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  //Get exact services provided by a Service Station

  retrieveServices(): void {
    this._serv.getAll().subscribe(
      (data) => {
        this.servicesListsFiltered = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  befFunc(z){
    let ServiceFiltServsList: Array<ServiceFiltServs> = [];
        for (let x of this.servicesListsFiltered) {
          
          for (let y of this.appServiceList) {
            if (x.service_id == y.service_id) {
              let list :ServiceFiltServs = {
              service_id: y.service_id,
              service_name: x.service_name,
              amount: 0,
              }
              ServiceFiltServsList.push(list);
            }
          }
          
        }
        console.log(ServiceFiltServsList);
        this.addElm(z, ServiceFiltServsList);
  }

  addElm(x,li){
      let id1 = 0;
      let id2 = 0;
      let id3 = 0;
      let str= '';
      console.log(li);
      for(let y of li)
      {
        if(y.service_id == 11)
          id1 = 1;
        if(y.service_id == 14)
          id2 = 1;
        if(y.service_id == 17)
          id3 = 1;
        str = str.concat(y.service_name+', ');
      }
      if(id1 == 1 && id2 == 1 && id3 == 1)
        this.addElement('Full Service - '+str, x.bay_id, x.vehicle_number);
      else
        this.addElement('Custom Service - '+str, x.bay_id, x.vehicle_number);
  }

  calcBayWork(){
    
    for(let y of this.wkbayList)
    {
      for(let x of this.AppointmentRows)
      {
        if(y.bayid == x.bay_id && x.date == moment().format('YYYY-MM-DD'))
        {
          y.bayload = Number(y.bayload) + Number(x.duration_hrs);
        }
      }
    }
    console.log(this.wkbayList);
  }


  addElement(servname, bayid, vehno): void {
    let id: number = 1;
    for (let i of this.dataSource.data) {
      i.position = id;
      id = id + 1;
    }
    ELEMENT_DATA.push({
      position: id,
      service: servname,
      bay: bayid,
      vehicleNo: vehno
    });
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  //ServiceStation profile
  servStaionDet(id): void {
    this._stat.getServStat(id).subscribe(
      (data) => {
        this.serStatLists = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  retrieveServicesById(id: number): void {
    this._servst.get(id).subscribe(
      (data) => {
        this.servicesLists = data;
        console.log(data);
        this.filterServices();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterServices(){
    this.newServiceFiltServsList = [];
    for(let x of this.servicesListsFiltered)
    {
      for(let y of this.servicesLists)
      {
        if (x.service_id == y.service_id) {
          this.count = this.count + 1;
          let list :ServiceFiltServsN ={
          service_id: x.service_id,
          service_name: x.service_name,
          amount: y.amount,
          duration_hrs: y.duration_hrs
        }
          this.newServiceFiltServsList.push(list);
        }
      }
    }
    console.log(this.newServiceFiltServsList);
    //this.count = this.newServiceFiltServsList.length;
    this.notInSer();
  }

  notInSer()
  {
    this.addServiceFiltServsList = []
    for(let x of this.servicesListsFiltered)
    {
      let isThere = 0;
      for(let y of this.servicesLists)
      {

        if (x.service_id == y.service_id) {
          isThere = 1;
        }
      }
      if (isThere == 0) {
        let list :ServiceFiltServsN ={
        service_id: x.service_id,
        service_name: x.service_name,

      }
        this.addServiceFiltServsList.push(list);
      }
    }
    console.log(this.addServiceFiltServsList);
  }

  openDialogSer(): void {
    let dialogRefSer = this.dialog.open(AddServicesComponent, {
      width: '600px',
      data: { listitem: this.addServiceFiltServsList },
    });

    dialogRefSer.afterClosed().subscribe((result) => {
      if (result) {
        this.servicesLists = [];
        this.newServiceFiltServsList = [];
        this.addServiceFiltServsList = [];
        
        for(let a of result.newlistitem){
          let b:ServiceStationServices = {
            st_id: this.serStaId,
            service_id: a.service_id,
            amount: a.amount,
            duration_hrs: a.duration_hrs
          }
          console.log(b)
          this._servst
          .saveServ(b)
          .subscribe({
                  next: () => {
                    console.log('Services stroed successfully');
                    //this.calCount('plus');
                    ++this.count;
                    
                    this.retrieveServicesById(this.serStaId);
                  },
                  error: (error) => {
                    console.log(error);
                  },
                });
        }
      }
    });
    
  }

  delete(id) {
    console.log(id);
    if (confirm('Are you sure?')) {
      this._servst
        .delete(id)
        .subscribe(() => {
          //this.calCount('min');
          --this.count;
          console.log('Service deleted successfully');
          console.log(this.count);
          this.servicesLists = [];
          this.newServiceFiltServsList = [];
          this.addServiceFiltServsList = [];
          this.retrieveServicesById(this.serStaId);
        });
    }
  }

}

