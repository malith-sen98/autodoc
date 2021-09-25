import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Vehicle } from '../models';

import { environment } from 'src/environments/environment.prod';

const baseUrl = `${environment.apiUrl}/vehicles`;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getBillId(): Observable<Vehicle> {
    return this.http.get<Vehicle>(baseUrl);
  }

  getVehls(vehNo): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${baseUrl}/${vehNo}`);
  }

  update(id, vehmil) {
    return this.http.put(`${baseUrl}/${id}`, {vehmil} );
}


}
