import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

// custom validator to check that two fields match
export class MustMatch {
    static confirmed = (controlName: string, matchingControlName: string) => {
    return (controlinput: AbstractControl): ValidationErrors | null => {
        const control = controlinput.get(controlName);
        const matchingControl = controlinput.get(matchingControlName);

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
            return ({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
            return null
        }
    };
    }
}