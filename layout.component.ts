﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        if (this.accountService.accountValue) {
            this.router.navigate(['/']);
        }
    }
}