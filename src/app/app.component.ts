import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { PhoneValidator } from './validators/phone.validator';
import { AddressValidator } from './validators/address.validator';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reactive-forms-codelab';

  form = this.fb.group({
    user: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.minLength(8), Validators.maxLength(8), PhoneValidator.checkPhone]],
      email: ['', [Validators.required, Validators.email]]
    }),
    addresses: this.fb.array([this.createAddress()])
  });

  constructor(private fb: FormBuilder) {}

  private createAddress() {
    return this.fb.group(
      {
        address: ['', Validators.required],
        address2: [''],
        city: [''],
        state: [''],
        postalCode: ['', Validators.required]
      },
      {
        validators: [AddressValidator.checkStateAndCity]
      }
    );
  }

  toggleExtraAddress(event: MatSlideToggleChange) {
    const addressFormArray = this.form.get('addresses') as FormArray;
    if (event.checked) {
      addressFormArray.push(this.createAddress());
    } else {
      addressFormArray.removeAt(1);
    }
  }

  handleFormSubmit() {}
}
