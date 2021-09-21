import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Service, Bill } from '../models';

import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/billing`;

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private http: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(baseUrl);
  }

  get(id): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${baseUrl}/${id}`);
  }

  gentBill(bill: Bill) {
    return this.http.post(`${baseUrl}/create-bill`, bill);
  }

  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  postBill(file:FormData){
    console.log(file);
    return this.http.post<any>(`${baseUrl}/upload`,file);
  }
}
