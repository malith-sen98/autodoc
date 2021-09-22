import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Appointment } from '../models';

import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/appointments`;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(baseUrl);
  }

  getAllbyId(id): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${baseUrl}/${id}`);
  }

  getAppoints(date): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${baseUrl}/${date}`);
  }
}
