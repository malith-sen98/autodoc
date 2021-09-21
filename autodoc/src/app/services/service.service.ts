import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Service, Bill } from '../models';

import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/services`;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  getById(id: number) {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(baseUrl);
  }

  get(id): Observable<Service[]> {
    return this.http.get<Service[]>(`${baseUrl}/${id}`);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}
