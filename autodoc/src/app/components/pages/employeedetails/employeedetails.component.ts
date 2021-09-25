import { Component, OnInit, Inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Pipe } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
//import { AddemployeeComponent } from '../addemployee/addemployee.component';
//import { EditemployeeComponent } from '../editemployee/editemployee.component';
import { StationService } from 'src/app/stationService/station.service';
import { AccountService } from 'src/app/services';


@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EmployeedetailsComponent implements OnInit {
  employee_details: any = [];
  delete_emp_Id: any;
  st_id: any = 1; //pass krnna one section eken
  edit_emp_id: any;
  searchedKeyword!: string;

  wadak_nathi: any;

  value = '';
  //constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _bookingserviceVariable: BookingtestService)
  constructor( private _stationServiceVariable:StationService,private _accountServiceVariable:AccountService,public service: EmployeeserviceService, public dialog: MatDialog) {
    //this.expandedElement = null;
  }

  ngOnInit() {
    // this.service.GetEmps()
    // .subscribe(
    //   data=> {this.employee_details = data ; // owner's name and stuff
    //     console.log(this.employee_details);
    //   },
    //   error=>console.log('vehicle details error!!',error)

    //   );

    this.get_station_id();

    // this.retvEployees();
    // console.log(this.employee_details, "eliyen");
    // console.log(this.employee_details.length, "length");


  }

  get_station_id(){
    console.log(this._accountServiceVariable.accountValue,"acccccc");
    let user_email = this._accountServiceVariable.accountValue.email;

    this._stationServiceVariable.get_station_id( user_email )
    .subscribe(
      data=> {this.st_id = data[0].st_id;              
        console.log(this.st_id,"user id ???????");
        this.retvEployees();
        console.log(this.employee_details, "eliyen");
        console.log(this.employee_details.length, "length");
    
      },
      error=> console.log('get user id error!',error)      
    );
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddemployeeComponent, {
      data: {
        station_id: this.st_id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.employee_details = [];
      this.retvEployees();
    });

  }

  opendialog2(emp_id: any) {
    const dialogRef = this.dialog.open(EditemployeeComponent, {
      data: {
        emp1_id: emp_id,
        station_id: this.st_id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.employee_details = [];
      this.retvEployees();
    });

  }
  opendialog3(emp_id: any) {
    const dialogRef = this.dialog.open(EditempComponent, {
      data: {
        emp1_id: emp_id,
        station_id: this.st_id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.employee_details = [];
      this.retvEployees();
    });

  }

  // openDialog2(edit_emp_id: any) {
  //   //this.service.initializeFormGroup();
  //   const dialogConfig = new MatDialogConfig();
  //   //dialogConfig.disableClose = true;
  //   //dialogConfig.autoFocus = true;
  //   dialogConfig.width = "60%";
  //   this.dialog.open(EditemployeeComponent, dialogConfig);
  // }

  retvEployees(): void {
    this.service.GetEmps(this.st_id)
      .subscribe(
        (data) => {
          this.employee_details = data; // owner's name and stuff
          console.log(this.employee_details);
        },
        error => console.log('employee details error!!', error)

      );
  }

  delete(delete_emp_Id: any) {
    if (confirm('Are you sure?')) {
    console.log(delete_emp_Id);
    this.service.deleteuser(delete_emp_Id)
      .subscribe(
        (data) => {
          this.wadak_nathi = data;
          console.log(this.wadak_nathi);
          this.retvEployees();
        },
        error => console.log('employee details deleted!!', error)

      );
    }
  }

}


@Component({
  selector: 'addemployee',
  templateUrl: 'addemployee.html',
})
export class AddemployeeComponent {
  constructor(public dialogRef: MatDialogRef<AddemployeeComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any, public service: EmployeeserviceService,) { }

  emp_id: any;
  name: string = "";
  age: any;
  salary: any;
  bayadd: any;
  position: string = "";
  mobile: any;
  bay_detailsadd: any;


  ngOnInit() {
    this.retvbays();
  }
  onsubmit() {
    if (this.salary == " " && this.mobile == " ") {

    } else {
      let arr = [this.name, this.age, this.salary, this.mobile, this.position, this.bayadd, this.data.station_id];

      this.service.adduser(arr)
        .subscribe(
          (data) => {
            console.log('successfully addedd!!', data)
            //this.empdet.retvEployees();
            this.dialogRef.close();


          },
          error => console.log('employee details error!!', error)

        );

    }


    //poddk ahnna one




  }

  retvbays(): void {
    console.log(this.data.station_id);
    this.service.Getbays(this.data.station_id)
      .subscribe(
        (data) => {
          this.bay_detailsadd = data; // owner's name and stuff
          console.log(this.bay_detailsadd);
        },
        error => console.log('employee details error!!', error)

      );
  }

}


@Component({
  selector: 'editemployee',
  templateUrl: 'editemployee.html',
})
export class EditemployeeComponent {
  constructor(public dialogRef: MatDialogRef<EditemployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public service: EmployeeserviceService) { }

  emp_id: number = 0;
  name: string = "";
  age: any;
  salary: any;
  bayedit: any;
  position: string = "";
  mobile: any;
  employee_details: any;
  Status: any;
  st_id = this.data.station_id;
  bay_details: any;
  employee_selected_bay: any;

  ngOnInit() {
    // this.service.GetEmps()
    // .subscribe(
    //   data=> {this.employee_details = data ; // owner's name and stuff
    //     console.log(this.employee_details);
    //   },
    //   error=>console.log('vehicle details error!!',error)

    //   );
    this.retvEployeeEdit();
    // console.log(this.employee_details, "eliyen");
    // console.log(this.employee_details.length, "length");
    this.retvbays();

  }

  retvEployeeEdit() {
    this.service.GetEmp1(this.data.station_id, this.data.emp1_id)
      .subscribe(
        (data) => {
          this.employee_details = data[0]; // 0 weni data eka gnnwa
          this.name = this.employee_details.emp_name;
          this.emp_id = this.employee_details.emp_id;
          this.age = this.employee_details.emp_age;
          this.bayedit = this.employee_details.bay_id;
          this.mobile = this.employee_details.mobile;
          this.salary = this.employee_details.salary;
          this.position = this.employee_details.role;
          this.Status = this.employee_details.status;

        },
        error => console.log('employee details error!!', error)

      );
  }


  retvEployees(): void {
    this.service.GetEmps(this.st_id)
      .subscribe(
        (data) => {
          this.employee_details = data; // owner's name and stuff
          console.log(this.employee_details);
        },
        error => console.log('employee details error!!', error)

      );
  }

  retvbays(): void {
    this.service.Getbays(this.st_id)
      .subscribe(
        (data) => {
          this.bay_details = data; // owner's name and stuff
          console.log(this.bay_details);
        },
        error => console.log('employee details error!!', error)

      );
  }

  changeVehNum(event: any) {
    this.bayedit = event;
  }

  onsubmit_check() {

    let arr = [this.emp_id, this.name, this.age, this.salary, this.mobile, this.position, this.Status, this.bayedit, this.data.station_id];
    console.log(arr);
    this.service.updateuser(arr)
      .subscribe(
        (data) => {
          console.log('successfully updated!!', data)
          //this.empdet.retvEployees();
          this.dialogRef.close();


        },
        error => console.log('employee details error!!', error)

      );

  }



}

@Component({
  selector: 'editemp',
  templateUrl: 'editemp.html',
})
export class EditempComponent {
  constructor(public dialogRef: MatDialogRef<EditempComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public service: EmployeeserviceService) { }

  emp_id: number = 0;
  name: string = "";
  age: any;
  salary: any;
  bay: any;
  position: string = "";
  mobile: any;
  employee_details: any;
  Status: any;
  st_id = this.data.station_id;

  ngOnInit() {
    // this.service.GetEmps()
    // .subscribe(
    //   data=> {this.employee_details = data ; // owner's name and stuff
    //     console.log(this.employee_details);
    //   },
    //   error=>console.log('vehicle details error!!',error)

    //   );
    this.retvEployeeEdit();
    // console.log(this.employee_details, "eliyen");
    // console.log(this.employee_details.length, "length");


  }

  retvEployeeEdit() {
    this.service.GetEmp1(this.data.station_id, this.data.emp1_id)
      .subscribe(
        (data) => {
          this.employee_details = data[0]; // 0 weni data eka gnnwa
          this.name = this.employee_details.emp_name;
          this.emp_id = this.employee_details.emp_id;
          this.age = this.employee_details.emp_age;
          this.bay = this.employee_details.bay_id;
          this.mobile = this.employee_details.mobile;
          this.salary = this.employee_details.salary;
          this.position = this.employee_details.role;
          this.Status = this.employee_details.status;

        },
        error => console.log('employee details error!!', error)

      );
  }


  retvEployees(): void {
    this.service.GetEmps(this.st_id)
      .subscribe(
        (data) => {
          this.employee_details = data; // owner's name and stuff
          console.log(this.employee_details);
        },
        error => console.log('employee details error!!', error)

      );
  }

  onsubmit_check() {

    let arr = [this.emp_id, this.name, this.age, this.salary, this.mobile, this.position, this.Status, this.bay, this.data.station_id];
    console.log(arr);
    this.service.updateuser(arr)
      .subscribe(
        (data) => {
          console.log('successfully updated!!', data)
          //this.empdet.retvEployees();
          this.dialogRef.close();



        },
        error => console.log('employee details error!!', error)

      );

  }



}



