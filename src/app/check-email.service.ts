import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {
  constructor(private httpClient: HttpClient) {}

  checkEmail(email: string): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', environment.checkEmailAWSPassword);
    return this.httpClient.post(`${environment.checkEmailAWSUrl}`, { email }, { headers });
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.checkEmail(control.value).pipe(
        debounceTime(300),
        catchError(
          error => {
            if (error.status === 409) {
              return of({
                alreadyTaken: true
              });
            } else if (error.status === 403) {
              return of({
                invalidDomain: true
              });
            } else {
              console.log('Problem with email validation WS');
              return of(null);
            }
          }
        )
      );
    };
  }
}
