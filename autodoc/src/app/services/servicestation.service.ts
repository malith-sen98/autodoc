import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { ServiceStation } from '../models';

const baseUrl = `${environment.apiUrl}/servicestation`;

@Injectable({ providedIn: 'root' })
export class ServicestationService {
    constructor(private http: HttpClient) { }

  getBillId(): Observable<ServiceStation> {
    return this.http.get<ServiceStation>(baseUrl);
  }

  getServStat(id): Observable<ServiceStation[]> {
    return this.http.get<ServiceStation[]>(`${baseUrl}/${id}`);
  }

  getServStatbyEmail(email): Observable<ServiceStation[]> {
    return this.http.get<ServiceStation[]>(`${baseUrl}/em/${email}`);
  } 

  getLastServStat() {
    return this.http.get<any>(baseUrl);
  }

  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }
}