import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import {MatTabChangeEvent} from '@angular/material/tabs';

import {
  AccountService,
  AlertService,
  RequestedstationService,
  ServicestationService,
  VehicleownerService,
  ServiceService,
  ReqstatservicesService,
} from '../services';
import { MustMatch } from '../helpers';
import {
  AccountReg,
  VehicleOwner,
  ReqServiceStation,
  Service,
  ReqStationServices,
  ServiceFiltServsN,
} from '../models';

class lastServli {
  service_id?: number;
    service_name?: string;
    description?: string;
    amount?: number;
    duration_hrs?: number;
}

@Component({ templateUrl: 'register.component.html' ,
styleUrls: ['register.component.css']})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  //accountFields: AccountReg;
  //servicestatFields = new Array<any>();
  reqServicestatFields = new Array<any>();
  vehownerFields = new Array<any>();
  serviceFields = new Array<any>();
  file_selected: File;
  reqStat_Reg;
  StatLast;
  reqstat_id;
  serstat_id;
  reqStat_nxtid;
  ServiceFiltServsList: Service[];
  serv_id;
  //serv_amount = 0.0;
  //serv_dur = 0.0;
  reqstatserv: Array<ReqStationServices> = [];
  is_Accepted = ''; //changed
  amut = 0;
  dur = 0;
  usertyp= 'vehicleowner';   //changed

  listitem: Array<lastServli> = [];

  opened = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private _vehown: VehicleownerService,
    private _reqstat: RequestedstationService,
    private _serstat: ServicestationService,
    private _serv: ServiceService,
    private _reqser: ReqstatservicesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        //title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        stname: [''],
        address: ['', Validators.required],
        town: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern('[0-9]+'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        bays: [''],
        serv_amount: [''],
        serv_dur: [''],
        userType: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        //acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: MustMatch.confirmed('password', 'confirmPassword'),
      }
    );

    this.reqStatID();
    this.serStatID();
    this.retrieveServices();

    //);
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('index => ', tabChangeEvent.index);
    if(tabChangeEvent.index == 0)
      this.form.value.userType = 'vehicleowner';
    if(tabChangeEvent.index == 1)
      this.form.value.userType = 'servicestation'
    console.log(this.form.value.userType)
  }

  valueChange()
  {
    console.log(this.form.value.town);
    this.form.value.userType = 'vehicleowner';
  }

  retrieveServices(): void {
    this._serv.getAll().subscribe(
      (data) => {
        this.ServiceFiltServsList = data;
        console.log(this.ServiceFiltServsList);
        for(let x of this.ServiceFiltServsList)
        {
          let it: lastServli = {
            service_id: x.service_id,
            service_name: x.service_name,
            description: x.description,
          }
          this.listitem.push(it);
        }
        console.log(this.listitem)
      },
      (error) => {
        console.log(error);
      }
    );
  }


  reqStatID() {
    this._reqstat.getReqServStat().subscribe(
      (data) => {
        this.reqStat_Reg = data;
        console.log(this.reqStat_Reg);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  serStatID() {
    this._serstat.getLastServStat().subscribe(
      (data) => {
        this.StatLast = data;
        console.log(this.StatLast);
        this.genNxtID();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  valuechangeAmu(name) {
    this.amut = Number(name);
  }

  valuechangeDur(name, itm) {
    this.dur= Number(name);
    let reqserv: ReqStationServices = {
      reg_number: this.reqStat_nxtid,
      service_id: itm.service_id,
      amount: Number(this.amut),
      duration: Number(this.dur),
    };
    this.reqstatserv.push(reqserv);
    this.form.value.serv_amount = 0.0;
    this.form.value.serv_dur = 0.0;
    console.log(this.reqstatserv);  //for (let i of this.reqstatserv) 
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  genNxtID() {
    if(this.reqStat_Reg.length != 0){
      console.log(this.reqStat_Reg[0].reg_number);
      let id = this.reqStat_Reg[0].reg_number.split('-');
      this.reqstat_id = id[1];
    }
    else
      this.reqstat_id = 0;
    console.log(this.reqstat_id);
    if (Number(this.reqstat_id) > this.StatLast[0].st_id)
      this.reqStat_nxtid = Number(this.reqstat_id) + 1;
    else this.reqStat_nxtid = Number(this.StatLast[0].st_id) + 1;
    this.reqStat_nxtid = 'REG-' + this.reqStat_nxtid;
    console.log(this.reqStat_nxtid);
  }

  chooseFile(event) {
    this.usertyp = 'servicestation';
    let fd = new FormData();
    if (event.target.value) {
      this.file_selected = <File>event.target.files[0];
      console.log(this.file_selected);
      fd.append('pdf', this.file_selected);
    }
  }

  submitBr() {
    let fd = new FormData();
    let file_name = this.reqStat_nxtid + '.pdf';
    fd.append('pdf', this.file_selected, file_name);
    this._reqstat.submitBr(fd).subscribe(
      (data) => {
        console.log('Successfully file submitted', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  savReqSevs(){
    //for (let i of this.reqstatserv) {
      this._reqser
        .saveServ(this.reqstatserv)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log('Services stroed successfully');
            
          },
          error: (error) => {
            console.log(error);
          },
        });
    //}
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      console.log(this.form.value)
      return;
    }

    this.loading = true;

    

    if (this.form.value.userType == 'vehicleowner') {
      this.is_Accepted = 'accepted';
      let vehowner: VehicleOwner = {
        first_name: this.form.value.firstName,
        last_name: this.form.value.lastName,
        address: this.form.value.address,
        home_town: this.form.value.town,
        email: this.form.value.email,
        mobile: this.form.value.mobile,
        owner_img_name: 'DEFAULTUSER.PNG'
      };
      this._vehown
        .register(vehowner)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log('Vehicle Owner Registered Successfully');
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else if (this.form.value.userType == 'servicestation') {
      this.is_Accepted = 'pending';
      let reqstat: ReqServiceStation = {
        reg_number: this.reqStat_nxtid,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        st_name: this.form.value.stname,
        address: this.form.value.address,
        town: this.form.value.town,
        email: this.form.value.email,
        mobile: this.form.value.mobile,
        bay_amount: this.form.value.bays,
      };
      this._reqstat
        .register(reqstat)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log(
              'Requested service station registration was successfull'
            );
            this.savReqSevs();
            this.submitBr();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }

    let accountFields: AccountReg = {
      email: this.form.value.email,
      userType: this.form.value.userType,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword,
      isAccepted: this.is_Accepted,
    };
    this.accountService
      .register(accountFields)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            'Registration successful, please check your email for more instructions',
            { keepAfterRouteChange: true }
          );
          
          this.router.navigate(['../login'], { relativeTo: this.route });
          // this.openDialog();
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
