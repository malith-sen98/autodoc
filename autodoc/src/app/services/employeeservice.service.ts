import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {



  _url_users = 'http://localhost:3000/users';
  _url_user1 = 'http://localhost:3000/user1';
  _url_adduser = 'http://localhost:3000/adduser';
  _url_bays = 'http://localhost:3000/bays';
  _url_deleteemp = 'http://localhost:3000/deleteemp';
  _url_updateuser = 'http://localhost:3000/updateuser';
  _url = 'http://localhost:3000/enroll';
  _url_getVehicleName = 'http://localhost:3000/getVehicleDetails';
  _url_getServiceStationsByHomeTown = 'http://localhost:3000/getServiceStationsByHomeTown';
  _url_getServiceStationsAll = 'http://localhost:3000/getServiceStationsAll';
  _url_getServicesOfServiceStation = 'http://localhost:3000/getServicesOfServiceStation';
  _url_getLockedDates = 'http://localhost:3000/getLockedDates';



  constructor(private _http: HttpClient) { }


  GetEmps(st_id: any) {
    var param = new HttpParams();

    param = param.append('stationId', st_id);
    return this._http.get<any>(this._url_users, { params: param });
  }
  Getbays(st_id: any) {
    var param = new HttpParams();
    console.log("servive get base");
    param = param.append('stationId', st_id);
    return this._http.get<any>(this._url_bays, { params: param });
  }


  GetEmp1(st_id: any, emp_id: any) {
    var param = new HttpParams();

    param = param.append('stationId', st_id);
    param = param.append('employeeId', emp_id);
    return this._http.get<any>(this._url_user1, { params: param });
  }


  adduser(userArray: any) {

    return this._http.post<any>(this._url_adduser, userArray);
  }

  updateuser(userArray: any) {
    return this._http.put<any>(this._url_updateuser, userArray);
  }

  deleteuser(userId: any) {
    console.log("awa methanata");
    var param = new HttpParams();
    param = param.append('emp_id', userId);

    return this._http.delete<any>(this._url_deleteemp, { params: param });
  }

  enroll(fromBookTestArray: Array<string>) {

    return this._http.post<any>(this._url, fromBookTestArray);
  }

  getVehicleDetails(userIdfromSession: number) {

    var param = new HttpParams();

    // Begin assigning parameters
    param = param.append('userId', userIdfromSession);


    return this._http.get<any>(this._url_getVehicleName, { params: param });
  }


  getServiceStationsByHomeTown(userIdfromSession: number) {

    var param = new HttpParams();

    param = param.append('userId', userIdfromSession);


    return this._http.get<any>(this._url_getServiceStationsByHomeTown, { params: param });
  }

  getServiceStationsAll(userIdfromSession: number) {

    var param = new HttpParams();

    param = param.append('userId', userIdfromSession);


    return this._http.get<any>(this._url_getServiceStationsAll, { params: param });
  }

  getAvailableServices(ServiceIdFromTs: number) {

    var param = new HttpParams();

    param = param.append('serviceId', ServiceIdFromTs);

    return this._http.get<any>(this._url_getServicesOfServiceStation, { params: param });
  }

  getLockedDates(ServiceIdFromTs: number, serviceDuration: number) {

    var param = new HttpParams();

    param = param.append('serviceId', ServiceIdFromTs);
    param = param.append('service_Duration', serviceDuration);


    return this._http.get<any>(this._url_getLockedDates, { params: param });
  }



}
