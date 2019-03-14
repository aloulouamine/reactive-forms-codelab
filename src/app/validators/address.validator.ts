import { AbstractControl } from '@angular/forms';

export class AddressValidator {
  static checkStateAndCity(control: AbstractControl) {
    const state = control.get('state');
    const city = control.get('city');
    if (!city.value && !state.value && city.touched && state.touched) {
      return { noStateAndCity: true };
    }
    return null;
  }
}
