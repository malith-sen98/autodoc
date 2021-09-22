import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AccountService } from '../../services';
import { Account, Role } from '../../models';

import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  opened = false; 
  panelOpenState = false;
  Role = Role;
  account: Account;

  constructor(private accountService: AccountService,
    private router: Router) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  ngOnInit(): void {
    console.log(this.account);
  }

  logout() {
    this.accountService.logout();
  }

  changePath()
  {
    if(this.account == undefined)
      this.router.navigate(['/account/login']);
    else if(this.account.userType == 'servicestation')
      this.router.navigate(['/stationprofile']);
    else if(this.account.userType == 'vehicleowner')
      this.router.navigate(['/profile']);
  }
}