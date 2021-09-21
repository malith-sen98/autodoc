import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AppointService } from '../models';

import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/appointservice`;

@Injectable({
  providedIn: 'root'
})
export class AppointservicesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AppointService[]> {
    return this.http.get<AppointService[]>(baseUrl);
  }

  getServs(id): Observable<AppointService[]> {
    return this.http.get<AppointService[]>(`${baseUrl}/${id}`);
  }
}
