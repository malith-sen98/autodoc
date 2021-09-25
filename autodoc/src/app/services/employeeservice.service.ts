import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {



  _url_users = environment.apiUrl+'/users';
  _url_user1 = environment.apiUrl+'/user1';
  _url_adduser = environment.apiUrl+'/adduser';
  _url_bays = environment.apiUrl+'/bays';
  _url_deleteemp = environment.apiUrl+'/deleteemp';
  _url_updateuser = environment.apiUrl+'/updateuser';
  _url = environment.apiUrl+'/enroll';
  _url_getVehicleName = environment.apiUrl+'/getVehicleDetails';
  _url_getServiceStationsByHomeTown = environment.apiUrl+'/getServiceStationsByHomeTown';
  _url_getServiceStationsAll = environment.apiUrl+'/getServiceStationsAll';
  _url_getServicesOfServiceStation = environment.apiUrl+'/getServicesOfServiceStation';
  _url_getLockedDates = environment.apiUrl+'/getLockedDates';



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
