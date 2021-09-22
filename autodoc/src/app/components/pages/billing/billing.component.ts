import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe, Time } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
import { EditPercentageComponent } from './edit-percentage/edit-percentage.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
//import * as fs from 'file-system';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

//Import Services
import {
  BillingService,
  ServiceService,
  VehicleService,
  AppointmentService,
  VehicleownerService,
  ServicestationservicesService,
  AppointservicesService,
  InventoryService,
  ServicestationService,
  AccountService,
} from './../../../services';

//Import Models
import {
  Service,
  Bill,
  Vehicle,
  Appointment,
  VehicleOwner,
  ServiceStationServices,
  ServiceFiltServs,
  AppointService,
  InventoryItem,
  ServiceStation,
} from '../../../models';
import { AddQtyComponent } from './add-qty/add-qty.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

export interface PeriodicElement {
  position: number;
  service_name: string;
  qty: number;
  uprice: number;
  amount: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];

class Invoice {
  customerName: string;
  address: string;
  contactNo: number;
  email: string;

  products: PeriodicElement[] = [];
  additionalDetails: string;
}

class AppointRows {
  appointment_id?: number;
  date?: string;
  time?: string;
  reminder?: number;
  duration_hrs?: number;
  st_id?: number;
  bay_id?: number;
  vehicle_number?: string;
  isOnline?: number;
}

class vehNoApp {
  veh_tem_no?: string;
  app_id?: number;
}

class InvItemList {
  item_name: string;
  quantity: number;
}

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class BillingComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'service-name',
    'qty',
    'uprice',
    'amount',
    'cancel',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clicked = true;
  errorMessage;
  billid;
  bill_total = 0;
  brand_name;
  veh_owner_name;
  brand_model;
  veh_reg_no;
  veh_owner_id;
  service_amut: number;
  tax_amount = 3;
  discount_amount = 0;
  tax_name = 'tax';
  dis_name = 'discount';
  datePickerDate = moment().format('YYYY-MM-DD');
  todayDate = moment(new Date()).format('YYYY-MM-DD');
  todDate = moment(new Date()).format('YYYY-MM-DD');
  // todDate:Date = moment().toDate();
  servicesLists?: ServiceStationServices[];
  servicesListsFiltered?: Service[];
  ServiceFiltServsList: Array<ServiceFiltServs> = [];
  ServiceInvItemsList: Array<InventoryItem> = [];
  appServiceList?: AppointService[];

  choice = 'autodoc_customer';

  paychoice = 'cash';

  vehNumberList = [];

  appointID;

  disableinput = false;

  vehNumberLists?: Vehicle[];

  billLists?: Bill[];

  invoice = new Invoice();

  fullService?: Service = {
    service_id: 0,
    service_name: '',
    description: '',
    duration: 0.0,
  };

  billInstance?: Bill = {
    bill_id: 0,
    description: '',
    amount: 0,
    //date: null,
    owner_id: 0,
    st_id: 0,
    appointment_id: 0,
    type: '',
  };

  appointLists?: Appointment[];

  vehowneLists?: VehicleOwner[];

  vehowneList: VehicleOwner = {
    owner_id: 0,
    first_name: '',
    last_name: '',
    address: '',
    home_town: '',
    email: '',
    mobile: '',
  };

  serStatLists?: ServiceStation[];

  AppointmentRows: AppointRows[];

  serStaId = 1;

  veh_type;

  billno;

  cash_amount = 0;
  change_amount = 0;

  veh_mileage;

  file_name;

  invList: Array<InvItemList> = [];

  newItems: Array<string> = [];

  account = this.accountService.accountValue;

  itemCategy = [
    'Battery',
    'Brake Oil',
    'Engine Oil',
    'Deferential Oil',
    'Gear Oil',
    'Grease',
    'A/C Filters',
    'Oil Filters',
    'Wax',
    'Cables',
    'Coolant',
    'Brake Pads',
    'Clutch Plates',
  ];

  //selectedValue: string;

  services: FormGroup;
  qnty: any;
  multiplier = 1.0;

  constructor(
    private accountService: AccountService,
    private _bill: BillingService,
    private _serv: ServiceService,
    private _servst: ServicestationservicesService,
    private _vehi: VehicleService,
    private _appoin: AppointmentService,
    private _vehown: VehicleownerService,
    private _appser: AppointservicesService,
    private _inv: InventoryService,
    private _stat: ServicestationService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    fb: FormBuilder
  ) {
    this.services = fb.group({
      battery_replacement: false,
      waxing: false,
      engine_tuneup: false,
      engine_repair: false,
      interior_cleaning: false,
      polishing: false,
      wheel_alignment: false,
      wheel_replace: false,
    });
  }

  ngOnInit(): void {
    this.retrieveServicesById(this.serStaId);
    this.retrieveServices();
    // this.retrieveServices();
    //this.retrieveServicesById(this.serStaId);
    this.getBill(this.serStaId);
    this.retrieveInvItemsById(this.serStaId);
    //this.getAppointments(this.todDate);

    this.retrieveApppots();
    this.checkVehNumbers();
    this.servStaionDet(this.serStaId);
    //this.servStaionDetbyEmail(this.account.email);
    //this.servStaionDetbyEmail('info@automiraj.lk');
    //this.checkServbyStat();
  }

  // setValue(){
  //   console.log(this.choice);
  //   this.cdr.detectChanges();
  // }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'custom-date-class' : '';
    }

    return '';
  };

  retrieveServices(): void {
    this._serv.getAll().subscribe(
      (data) => {
        this.servicesListsFiltered = data;
        console.log(data);
        for (let x of this.servicesListsFiltered) {
          for (let y of this.servicesLists) {
            if (x.service_id == y.service_id) {
              let list = new ServiceFiltServs();
              list.service_id = x.service_id;
              list.service_name = x.service_name;
              list.amount = y.amount;
              this.ServiceFiltServsList.push(list);
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  OnDateChange(event) {
    console.log(this.todDate);
    this.todDate = moment(event).format('YYYY-MM-DD');
    console.log(this.todDate);
    let count;
    for (let i of this.dataSource.data) {
      count = count + 1;
    }
    this.dataSource.data.splice(0, count);
    this.dataSource._updateChangeSubscription();
    this.retrieveApppots();
  }

  retrieveApppots(): void {
    this._appoin.getAllbyId(this.serStaId).subscribe(
      (data: any) => {
        this.appointLists = data;
        console.log(data);
        this.AppointmentRows = data;
        console.log(this.AppointmentRows);
        for (var i in this.AppointmentRows) {
          let range = this.getRange(
            moment(this.AppointmentRows[i].time).format('HH '),
            moment(this.AppointmentRows[i].time).format('mm '),
            this.AppointmentRows[i].duration_hrs
          );
          this.AppointmentRows[i].time = range;
        }
        console.log(this.AppointmentRows);
        //console.log(data);
        this.getVehicles();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getVehicles(): void {
    this.vehNumberList.splice(0, this.vehNumberList.length);
    for (let a of this.AppointmentRows) {
      if (a.isOnline == 1) {
        console.log(a.vehicle_number);
        let cmplt = this.checkCompletion(a);
        console.log(cmplt);
        if (cmplt == 'completed' && a.date.toString() == this.todDate) {
          this.vehNumberList.push(a.vehicle_number);
        }
      }
    }
    console.log(this.vehNumberList);
  }

  

  retrieveServicesById(id: number): void {
    this._servst.get(id).subscribe(
      (data) => {
        this.servicesLists = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  retrieveInvItemsById(id: number): void {
    this._inv.get(id).subscribe(
      (data) => {
        this.ServiceInvItemsList = data;
        console.log(data);
        for (let x of this.itemCategy) {
          for (let y of this.ServiceInvItemsList) {
            if (x == y.item_type) {
              this.newItems.push(y.item_type);
              break;
            }
          }
        }
        console.log(this.newItems);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBill(id: number): void {
    this._bill.get(id).subscribe(
      (data) => {
        let bill_number: number = 0;
        this.billLists = data;

        for (let i of this.billLists) {
          bill_number = i.bill_id;
        }
        this.billid = bill_number + 1;
        this.billno = 'INV' + (bill_number + 1);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addElement(servname, amut): void {
    let id: number = 1;
    for (let i of this.dataSource.data) {
      i.position = id;
      id = id + 1;
    }
    ELEMENT_DATA.push({
      position: id,
      service_name: servname + ' (including labour charges)',
      //service_type: 'Full',
      uprice: amut,
      qty: 1,
      amount: amut,
    });
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    this.clacTotal();
  }

  delete(elm) {
    // this.dataSource.data = this.dataSource.data
    //   .filter((i) => i !== elm)
    //   .map((i, idx) => ((i.position = idx + 1), i));
    let id: number = 1;
    const index = this.dataSource.data.indexOf(elm);
    //myArray.map(x => x.hello).indexOf('stevie')
    const ind = this.invList.map((x) => x.item_name).indexOf(elm.service_name); //methana dn hari
    this.invList.splice(ind, 1);
    //console.log(elm);
    this.checkDisabled(elm.service_name, false);
    console.log(ind);

    this.dataSource.data.splice(index, 1);
    for (let i of this.dataSource.data) {
      i.position = id;
      id = id + 1;
    }
    console.log(this.invList);
    this.dataSource._updateChangeSubscription();
    this.clacTotal();
  }

  checkVehNumbers() {
    //console.log(this.vehNumberList);
    for (let veh of this.vehNumberList) {
      console.log(veh);
    }
  }

  changeVehNum(value): void {
    
    console.log(value);
    this._vehi.getVehls(value).subscribe(
      (data) => {
        
        console.log(data)
        this.vehNumberLists = data;
        this.brand_name = data[0].make.toUpperCase();
        this.brand_model = data[0].model.toUpperCase();
        this.veh_owner_id = data[0].owner_id;
        this.veh_type = data[0].type;
        this.veh_mileage = data[0].mileage;
        this.veh_reg_no = data[0].vehicle_number;
        this.selectvehicleType(this.veh_type);
        this.findVehOwner(data[0].owner_id);
        console.log(data);
        this.getAppId(value);
      },
      (error) => {
        console.log(error);
      }
    );
  }

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

  servStaionDetbyEmail(email): void {
    this._stat.getServStatbyEmail(email).subscribe(
      (data) => {
        this.serStatLists = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  findVehOwner(id): void {
    this._vehown.getVehlOwn(id).subscribe(
      (data) => {
        console.log(data);
        this.vehowneList = data[0];
        console.log(this.vehowneList);
        this.veh_owner_name = (
          data[0].first_name +
          ' ' +
          data[0].last_name
        ).toUpperCase();
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clacTotal(): void {
    let tot: number = 0;
    //console.log(typeof(this.dataSource.data));
    for (let i of this.dataSource.data) {
      tot = tot + Number(i.amount);
    }
    this.bill_total = tot;
    this.bill_total = (this.bill_total * (100 + this.tax_amount)) / 100;
    this.bill_total = (this.bill_total * (100 - this.discount_amount)) / 100;
  }

  openDialog(servname, amut): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      
      data: { service_name_dialog: servname, service_amount: amut },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      this.service_amut = result;
      if (this.service_amut) {
        this.addElement(servname, this.service_amut);
        //event.target.disabled = true;
      }
    });
  }

  openDialogCustomer(): void {
    const dialogRefCst = this.dialog.open(AddCustomerComponent, {

      data: {},
    });

    dialogRefCst.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');

      if (result) {
        this.vehowneList = result;
        this.veh_owner_name = result.first_name + ' ' + result.last_name;
        console.log(this.vehowneList);
        //this.addElement(servname, this.service_amut);
        //event.target.disabled = true;
      }
    });
  }

  genBill(): void {
    this.billInstance.description = JSON.stringify(this.dataSource.data);
    this.billInstance.amount = this.bill_total;
    this.billInstance.st_id = this.serStaId;
    this.billInstance.bill_id = this.billid;
    if (this.choice == 'normal_customer') {
      this.file_name = this.billInstance.bill_id + '.pdf';
      this.billInstance.owner_id = this.vehowneList.owner_id;
      this.billInstance.appointment_id = 10000089;
    } else if (this.choice == 'autodoc_customer') {
      this.file_name = this.appointID + '.pdf';
      this.billInstance.owner_id = this.veh_owner_id;
      this.billInstance.appointment_id = this.appointID;
    }
    this.billInstance.path = this.file_name;

    this.billInstance.type = this.choice;
    console.log(this.billInstance);
    this._bill.gentBill(this.billInstance).subscribe({
      next: () => {
        console.log('Bill Generated Successfully');
      },
      error: (error) => {
        console.log(error);
      },
    });
    if (this.choice == 'autodoc_customer') this.updateMillage(this.veh_reg_no);

    this.generatePDF();
    this.resetBill();
  }

  //   actionMethod(event: any) {
  //     event.target.disabled = true;
  // }

  checkDisabled(sername, state): boolean {
    for (let i of this.dataSource.data) {
      if (i.service_name == sername) return state;
    }
  }

  disbAmt(stat) {
    this.disableinput = stat;
  }

  print() {
    var element = document.getElementById('pdfclass');
    html2canvas(element).then((canvas) => {
      var imgData = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      var imgHeight = (canvas.height * 208) / canvas.width;

      doc.addImage(imgData, 0, 0, 208, imgHeight);
      doc.save(this.billid + '_invoice.pdf');
    });
  }

  resetBill() {
    let count = 0;
    this.billid = this.billid + 1;
    for (let i of this.dataSource.data) {
      count = count + 1;
    }
    this.dataSource.data.splice(0, count);
    this.dataSource._updateChangeSubscription();
    this.datePickerDate = moment().format('YYYY-MM-DD');
    this.veh_owner_name = '';
    this.brand_name = '';
    this.brand_model = '';
    this.veh_reg_no = '';
    this.bill_total = 0;
  }

  getAppId(vehno) {
    this.datePickerDate
    for (let x of this.AppointmentRows) {
      if (vehno == x.vehicle_number && x.date.toString() == this.todDate ) {
        this.appointID = x.appointment_id;
      }
    }
    this.getAppServs();
  }

  getAppServs(): void {
    console.log(this.appointID)
    this._appser.getServs(this.appointID).subscribe(
      (data) => {
        this.appServiceList = data;
        console.log(data);
        this.addServAuto();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addServAuto() {
    for (let x of this.appServiceList) {
      for (let y of this.ServiceFiltServsList) {
        if (x.service_id == y.service_id) {
          this.addElement(y.service_name, y.amount);
        }
      }
    }
  }

  valuechange() {
    this.change_amount = this.cash_amount - this.bill_total;
    this.updateInvItems();
  }

  openDialogPerc(sername, per) {
    const dialogRefPer = this.dialog.open(EditPercentageComponent, {
      data: { name: sername, percentage: per },
    });

    dialogRefPer.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      if (result) {
        if (sername == 'tax') {
          this.bill_total = (this.bill_total * (100 - this.tax_amount)) / 100;
          this.tax_amount = result;
          //this.clacTotal();
          this.bill_total = (this.bill_total * (100 + this.tax_amount)) / 100;
        } else if (sername == 'discount') {
          this.bill_total = (this.bill_total * (100 + this.discount_amount)) / 100;
          this.discount_amount = result;
          //this.clacTotal();
          this.bill_total = (this.bill_total * (100 - this.discount_amount)) / 100;
        }
      } else {
        if (sername == 'tax') {
          this.tax_amount = 0;
          this.bill_total = (this.bill_total * (100 + this.tax_amount)) / 100;
        } else if (sername == 'discount') {
          this.discount_amount = 0;
          this.bill_total =
            (this.bill_total * (100 - this.discount_amount)) / 100;
        }
      }
    });
  }

  openDialogQty(servname): void {
    const dialogRefQty = this.dialog.open(AddQtyComponent, {
      width: '600px',
      data: { itemname: servname, listitem: this.ServiceInvItemsList },
    });

    dialogRefQty.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      //  this.qnty = result.qnty;
      if (result) {
        this.qnty = result.qnty;
        this.addElementInvn(result.itemname, this.qnty, result.itmpr);
        let inv: InvItemList = {
          item_name: result.itemname,
          quantity: result.qnty,
        };
        this.invList.push(inv);
        console.log(this.invList);
        //event.target.disabled = true;
      }
    });
  }

  addElementInvn(servname, qty, prc): void {
    let id: number = 1;
    for (let i of this.dataSource.data) {
      i.position = id;
      id = id + 1;
    }
    console.log(prc);
    ELEMENT_DATA.push({
      position: id,
      service_name: servname,
      qty: qty,
      uprice: prc,
      amount: prc * qty,
    });
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    this.clacTotal();
  }

  selectvehicleType(vehtype) {
    if (vehtype == 'car') this.multiplier = 1.0;
    else if (vehtype == 'van') this.multiplier = 1.2;
    else if (vehtype == 'suv') this.multiplier = 1.4;
    else if (vehtype == 'heavy vehicle') this.multiplier = 1.6;
    console.log(this.multiplier);
  }

  checkCompletion(appointmentRow: any) {
    //console.log(appointmentRow);
    let appointment_date = moment(appointmentRow.date).format('YYYY-MM-DD');
    let today = moment(new Date()).format('YYYY-MM-DD');

    // console.log(appointment_date,today)

    if (moment(appointment_date).isBefore(today)) {
      return 'completed';
    } else if (moment(appointment_date).isSame(today)) {
      if (this.Is_within_Range(appointmentRow.time) == 'within range') {
        return 'on-going';
      } else if (this.Is_within_Range(appointmentRow.time) == 'before start') {
        return 'yet to start';
      } else {
        return 'completed';
      }
    }
  }

  updateMillage(vehid) {
    this._vehi.update(vehid, this.veh_mileage).subscribe({
      next: () => {
        console.log('Update successful of Vehicle Mileage');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateInvItems() {
    for (let x of this.invList) {
      console.log(x);
      this._inv.update(x.item_name, x.quantity).subscribe({
        next: () => {
          console.log('Update successful of Inventory Items List');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  Is_within_Range(range: string) {
    var LHS_RHS = range.split(' - '); //09:00 AM - 01:00 PM
    // console.log(LHS_RHS[0]);// 09:00 AM
    // console.log(LHS_RHS[1]);// 01:00 PM

    let LHS_hrs = moment(LHS_RHS[0], ['hh.mm A']).format('HH:mm'); // 9:00
    let RHS_hrs = moment(LHS_RHS[1], ['hh.mm A']).format('HH:mm'); // 13:00
    //  console.log(LHS_hrs,"jj",RHS_hrs);

    let LHS_hr_min = LHS_hrs.split(':');
    let LHS_hr_number = LHS_hr_min[0]; //9
    let LHS_min_number = LHS_hr_min[1]; //0, 30

    let final_LHS = Number(LHS_hr_number) + Number(LHS_min_number) / 60; // 9.0 || 9.5 wage

    let RHS_hr_min = RHS_hrs.split(':');
    let RHS_hr_number = RHS_hr_min[0]; //13
    let RHS_min_number = LHS_hr_min[1]; //0,30

    let final_RHS = Number(RHS_hr_number) + Number(RHS_min_number) / 30; // 13.0||13.5

    let now = moment(new Date()).format('HH:mm');
    let now_hr_min = now.split(':');
    let now_hr_number = now_hr_min[0]; //13
    let now_min_number = now_hr_min[1]; //0,42,53,37
    let final_now = Number(now_hr_number) + Number(now_min_number) / 60;

    //console.log(final_LHS,final_now,"k",final_RHS);
    if (final_now < final_RHS && final_now > final_LHS) {
      return 'within range'; // dan welawa range eka athulenam tiyenne
    } else if (final_now < final_LHS) {
      return 'before start';
    } else {
      return 'after completed';
    }
  }

  getRange(time_hrs: string, time_mins: string, duration: number) {
    // console.log(time_hrs,time_mins,duration);
    let mins_deci = Number(time_mins) / 60; //30 =0.5
    // console.log(mins_deci);
    let hrs_mins_deci = Number(time_hrs) + mins_deci; // 13:30 =   13+ 0.5 = 13.5
    // console.log(hrs_mins_deci);
    //  typeof(hrs_mins_deci);
    //  typeof(duration);
    let end_time = hrs_mins_deci + Number(duration); // 13.5 + 2.0 = 15.5
    // console.log(end_time,"end");
    let end_time_min = String((end_time % 1) * 60);
    30 || 0;

    if (end_time_min == '0') {
      end_time_min = '00';
    }

    let end_time_hr = String(Math.floor(end_time));
    if (end_time_hr.length == 1) {
      end_time_hr = '0' + end_time_hr;
    }

    //  console.log(end_time_hr,"!!",end_time_min);

    let final_end_time_str = end_time_hr + ':' + end_time_min; //15:30
    let strt_time = time_hrs + ':' + time_mins;
    //console.log(strt_time,"hehe",final_end_time_str);
    let range =
      moment(strt_time, ['HH.mm']).format('hh:mm A') +
      ' - ' +
      moment(final_end_time_str, ['HH.mm']).format('hh:mm A');
    return range;
  }

  generatePDF(action = 'print') {
    let docDefinition = {
      content: [
        {
          text: this.serStatLists[0].st_name,
          fontSize: 16,
          bold: true,
          alignment: 'center',
          color: '#047886',
        },
        {
          text: this.serStatLists[0].address + ', ' + this.serStatLists[0].town,
          fontSize: 12,
          alignment: 'center',
          color: '#047886',
        },
        {
          text: this.serStatLists[0].mobile,
          fontSize: 12,
          alignment: 'center',
          color: '#047886',
        },
        {
          text: this.serStatLists[0].email,
          fontSize: 12,
          alignment: 'center',
          color: '#047886',
        },
        {
          text: '\n INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue',
        },
        {
          columns: [
            [
              {
                text: 'Customer Details',
                style: 'sectionHeader',
              },
            ],
            [
              {
                text: 'Bill Details',
                style: 'sectionHeader',
                alignment: 'right',
              },
            ],
          ],
        },
        {
          columns: [
            [
              { text: 'Customer ID: ' + this.vehowneList.owner_id }, //this.billInstance.owner_id
              {
                text:
                  this.vehowneList.first_name +
                  ' ' +
                  this.vehowneList.last_name,
                bold: true,
              },
              {
                text:
                  this.vehowneList.address +
                  ', ' +
                  this.vehowneList.home_town +
                  ', Sri Lanka',
              },
              { text: this.vehowneList.email },
              { text: this.vehowneList.mobile },
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right',
              },
              {
                text: `Bill No : ${this.billid}`,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: 'Vehicle Information',
          style: 'sectionHeader',
        },
        {
          text:
            'Vehicle Reg No: ' +
            this.veh_reg_no +
            ' - ' +
            this.brand_name +
            ' ' +
            this.brand_model,
        },
        // {
        //   text: this.vehNumberLists[0].make+' '+this.vehNumberLists[0].model,
        // },
        {
          text: 'Current Odometer Reading: ' + this.veh_mileage + ' KM',
        },
        {
          text: 'Service/Item Details',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto'],
            body: [
              [
                'No.',
                'Description',
                'Quantity',
                'Unit Price (Rs.)',
                'Amount (Rs.)',
              ],
              ...this.dataSource.data.map((p) => [
                p.position,
                p.service_name,
                p.qty,
                p.uprice,
                p.amount.toFixed(2),
              ]),
              [
                { text: 'Total Amount (Rs.)', colSpan: 4 },
                {},
                {},
                {},
                this.bill_total.toFixed(2),
              ],
              [
                { text: 'Discount (%)', colSpan: 4 },
                {},
                {},
                {},
                this.discount_amount.toFixed(2) + ' %',
              ],
              [
                { text: 'Tax (%)', colSpan: 4 },
                {},
                {},
                {},
                this.tax_amount.toFixed(2) + ' %',
              ],
              [
                { text: 'Cash Amount (Rs.)', colSpan: 4 },
                {},
                {},
                {},
                Number(this.cash_amount).toFixed(2),
              ],
              [
                { text: 'Change (Rs.)', colSpan: 4 },
                {},
                {},
                {},
                Number(this.change_amount).toFixed(2),
              ],
            ],
          },
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader',
        },
        {
          text: '',
          margin: [0, 0, 0, 15],
        },
        {
          columns: [
            // [{ qr: `${this.veh_owner_id}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ],
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader',
        },
        {
          ul: [
            'Please contact adminstration office for any invoice inquaries.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
            'This is system generated invoice. No signature is required.',
          ],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
      },
    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'open') {
      pdfMake.createPdf(docDefinition).open();
    } else {
      pdfMake.createPdf(docDefinition).print();
      var pdfDocGenerator = pdfMake.createPdf(docDefinition);
      //console.log(typeof(pdfDocGenerator));
      pdfDocGenerator.getBlob((blob) => {
        console.log(blob);
        this.saveFile(blob);
      });
    }
  }

  saveFile(data) {
    //let file_name = this.billno + '-' + this.vehowneList.owner_id + '.pdf';
    //console.log(data);
    let fd = new FormData();

    if (data) {
      console.log(typeof data);
      fd.append('blob', data, this.file_name);
      //console.log(fd.get("blob"));
      this._bill.postBill(fd).subscribe(
        (data) => {
          console.log('Successfully sent', data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
