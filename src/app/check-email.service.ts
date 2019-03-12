import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {

  constructor(private httpClient: HttpClient) { }

  checkEmail(email: string): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', environment.checkEmailAWSPassword)
    return this.httpClient.post(`${environment.checkEmailAWSUrl}`, { email }, { headers })
  }
}
