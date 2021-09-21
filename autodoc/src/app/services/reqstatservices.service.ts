import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ReqStationServices } from '../models';

const baseUrl = `${environment.apiUrl}/requestatserv`;


@Injectable({
  providedIn: 'root'
})
export class ReqstatservicesService {

  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  getAll(): Observable<ReqStationServices[]> {
    return this.http.get<ReqStationServices[]>(baseUrl);
  }

  get(id): Observable<ReqStationServices[]> {
    return this.http.get<ReqStationServices[]>(`${baseUrl}/${id}`);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

  saveServ(services: ReqStationServices[]) {
    return this.http.post(`${baseUrl}/insert`, services);
  }
}
