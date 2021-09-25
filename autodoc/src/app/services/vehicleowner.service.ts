import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { VehicleOwner } from '../models';

import { environment } from 'src/environments/environment.prod';

const baseUrl = `${environment.apiUrl}/vehicleowner`;

@Injectable({
  providedIn: 'root'
})
export class VehicleownerService {

  constructor(private http: HttpClient) { }

  getBillId(): Observable<VehicleOwner> {
    return this.http.get<VehicleOwner>(baseUrl);
  }

  getVehlOwn(id): Observable<VehicleOwner[]> {
    return this.http.get<VehicleOwner[]>(`${baseUrl}/${id}`);
  }

  register(account: VehicleOwner) {
    return this.http.post(`${baseUrl}/register`, account);
  }
  
}
