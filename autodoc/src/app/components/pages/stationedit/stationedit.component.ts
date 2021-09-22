import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceStation } from 'src/app/models';
import { ServicestationService } from 'src/app/services';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stationedit',
  templateUrl: './stationedit.component.html',
  styleUrls: ['./stationedit.component.css']
})
export class StationeditComponent implements OnInit {
  serStaId = 1;
  serStatLists?: ServiceStation[];

  email = new FormControl('', [Validators.required, Validators.email]);
  telephone = new FormControl('', [Validators.required])
  fname = new FormControl('', [Validators.required]);
  lname = new FormControl('', [Validators.required])
  addline1 = new FormControl('', [Validators.required]);
  // addline2 = new FormControl('High Level Road', [Validators.required])
  town = new FormControl('', [Validators.required])
  compname = new FormControl('', [Validators.required])
  regno = new FormControl('', [Validators.required])

 
  

  constructor(public dialog: MatDialog,
    private _stat: ServicestationService,
    private router: Router) {}

  openDialog() {
    this.dialog.open(ChangepasswordComponent, {
      data: {
        email: this.serStatLists[0].email
      }
    });
  }

  getErrorMessage() {
    // if (this.email.hasError('required')) {
    //   return 'You must enter a value';
    // }

    // return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  ngOnInit(): void {
    this.servStaionDet(this.serStaId);
  }

  //ServiceStation profile
  servStaionDet(id): void {
    this._stat.getServStat(id).subscribe(
      (data) => {
        this.serStatLists = data;
        console.log( data[0]);
        this.fname.setValue(data[0].firstName); 
        this.lname.setValue(data[0].lastName); 
        this.addline1.setValue(data[0].address); 
        this.town.setValue(data[0].town); 
        this.telephone.setValue(data[0].mobile);
        this.email.setValue(data[0].email);
        this.compname.setValue(data[0].st_name);
        this.regno.setValue(data[0].st_id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  back_button(){
    this.router.navigate(['/stationprofile']);
  }



  onSubmit() {
    this.serStatLists[0].firstName = this.fname.value;
    this.serStatLists[0].lastName = this.lname.value;
    this.serStatLists[0].email = this.email.value;
    this.serStatLists[0].address = this.addline1.value;
    this.serStatLists[0].town = this.town.value;
    this.serStatLists[0].mobile = this.telephone.value;
    this.serStatLists[0].st_name = this.compname.value;
    this.serStatLists[0].st_id = this.regno.value;
    console.log(this.serStatLists[0]);
    this._stat.update(this.regno.value, this.serStatLists[0])
            .subscribe({
                next: () => {
                    console.log("Successfully updated");
                    this.router.navigate(['/stationprofile']);
                    //this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                  console.log(error)
                }
            });
    }
  }