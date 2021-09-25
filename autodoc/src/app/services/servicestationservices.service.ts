import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { reqServ, ReqStationServices, Service, ServiceStationServices } from '../models';

import { environment } from 'src/environments/environment.prod';

const baseUrl = `${environment.apiUrl}/servicestationservices`;

@Injectable({
  providedIn: 'root'
})
export class ServicestationservicesService {

  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  getAll(): Observable<ServiceStationServices[]> {
    return this.http.get<ServiceStationServices[]>(baseUrl);
  }

  get(id): Observable<ServiceStationServices[]> {
    return this.http.get<ServiceStationServices[]>(`${baseUrl}/${id}`);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

  saveServ(services: ServiceStationServices) {
    return this.http.post(`${baseUrl}/insert`, services);
  }

  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
