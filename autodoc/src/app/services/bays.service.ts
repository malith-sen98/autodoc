import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Bay, InventoryItem } from '../models';

import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/bays`;

@Injectable({
  providedIn: 'root'
})
export class BaysService {

  constructor(private http: HttpClient) { }

  getById(id: number) : Observable<Bay[]> {
    return this.http.get<Bay[]>(`${baseUrl}/${id}`);
  }
}
