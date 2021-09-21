import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryItem } from '../models';

import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/inventory`;


@Injectable({
  providedIn: 'root'
})
export class InventoryService {



  _url_inventory='http://localhost:3000/inv';
  _url_search='http://localhost:3000/search';
  _url_addinventory='  http://localhost:3000/addinv';
  _url_deleteinv = 'http://localhost:3000/deleteinv';
  _url_updateinv = 'http://localhost:3000/updateinv';
  _url_inv1 = 'http://localhost:3000/inv1';
 
 



  constructor(private _http:HttpClient,
    private http: HttpClient) { }

  form: FormGroup = new FormGroup({

    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),

  });

  initializeFormGroup() {
    this.form.setValue({
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',

    });
  }

  GetInven(st_id:any) {
    var param = new HttpParams();

    param = param.append('ID', st_id );
    return this._http.get<any>(this._url_inventory,{params:param});
  }

  SearchInven(item:any, stid: any) {
    var param = new HttpParams();

    param = param.append('ID1', item);
    param = param.append('STID', stid);
    return this._http.get<any>(this._url_search,{params:param});
  }


  addinventory(userArray: any){
    return this._http.post<any>(this._url_addinventory,userArray);
  }

  deleteuser(itemId: any) {
    console.log("works");
    var param = new HttpParams();
    param = param.append('item_id', itemId);

    return this._http.delete<any>(this._url_deleteinv, { params: param });
  }

  updateinv(userArray: any) {
    return this._http.put<any>(this._url_updateinv, userArray);
  }
  GetInv1(st_id: any, item_id: any) {
    var param = new HttpParams();

    param = param.append('stationId', st_id);
    param = param.append('InventoryId', item_id);
    return this._http.get<any>(this._url_inv1, { params: param });
  }


  
 
  getById(id: number) {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  getAll(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(baseUrl);
  }

  get(id): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${baseUrl}/${id}`);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

  update(invnm, qty) {
    return this.http.post(`${baseUrl}/invupdate`, { invnm, qty } );
}

}
