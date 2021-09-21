import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services';
import { Account, Role } from '../../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  panelOpenState = false;
  account: Account;

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
  }
}
