import { AbstractControl } from '@angular/forms';

export class PhoneValidator {
  static checkPhone(control: AbstractControl) {
    if (control && control.value && control.value.indexOf('0') !== 0) {
      return { phoneFormat: true };
    }
    return null;
  }
}
