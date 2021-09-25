import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { ServiceStation, ReqServiceStation } from '../models';

const baseUrl = `${environment.apiUrl}/requestedstation`;

@Injectable({
  providedIn: 'root'
})
export class RequestedstationService {

  constructor(private http: HttpClient) { }

  getReqServStat() {
    return this.http.get<any>(baseUrl);
  }

  getServStat(id): Observable<ServiceStation[]> {
    return this.http.get<ServiceStation[]>(`${baseUrl}/${id}`);
  }

  register(account: ReqServiceStation) {
    return this.http.post(`${baseUrl}/register`, account);
  }

  submitBr(file:FormData){
    console.log(file);
    return this.http.post<any>(`${baseUrl}/upload`,file);
  }
}
