import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AccountService } from 'src/app/services';
import { MustMatch } from '../../../../helpers';

export interface DialogData{
  email: string;
}


@Component({
  selector: 'app-changepassword.html',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
    form: FormGroup;

  // oldPassword = new FormControl('', [Validators.required])
  // newPassword = new FormControl('', [Validators.required])
  // reNewPassword = new FormControl('', [Validators.required])

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  private accountService: AccountService,
  private formBuilder: FormBuilder,) {}

  // getErrorMessage() {
  //   if (this.newPassword.hasError('required')) {
  //     return 'You must enter a Password';
  //   }

  //   return this.newPassword.hasError('email') ? 'Not a valid Password' : '';
  // }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
  }, {
    validators: MustMatch.confirmed('password', 'confirmPassword'),
  });
  }

  get f() { return this.form.controls; }

    onSubmitPsw() {
        if (this.form.invalid) {
            return;
        }
        this.accountService.resetPasswordLog(this.data.email, this.f.password.value, this.f.confirmPassword.value)
            .subscribe({
                next: () => {
                    console.log("Password reset successfull");
                },
                error: error => {
                  console.log(error);
                }
            });
    }


}
