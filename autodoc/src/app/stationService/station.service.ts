import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class StationService {

  _url_getTodayBookings= environment.apiUrl+'/getTodayBookings';
  _url_get_owner_vehicle_details = environment.apiUrl+'/get_owner_vehicle_details';
  _url_get_appointment_services= environment.apiUrl+'/get_appointment_services';
  _url_get_station_id = environment.apiUrl+'/get_station_id';




  constructor(private _http:HttpClient) { }

  // enroll(fromBookTestArray: Array<string>) {
    
  //   return this._http.post<any>(this._url,fromBookTestArray);
  // }

  // getVehicleDetails(userIdfromSession: number){

  //   var param = new HttpParams();

  //   // Begin assigning parameters
  //   param = param.append('userId', userIdfromSession );
    

  //   return this._http.get<any>(this._url_getVehicleName, {params:param});
  // }

  getTodayBookings(station_id:any){
    var param = new HttpParams(); 
    param = param.append('st_id', station_id );
    return this._http.get<any>(this._url_getTodayBookings, {params:param});
  }

  get_owner_vehicle_details(vehicle_number:any){
    var param = new HttpParams(); 
    param = param.append('vehicle_number', vehicle_number );
    return this._http.get<any>(this._url_get_owner_vehicle_details, {params:param});
  }

  get_appointment_services(appointment_id:any){
    var param = new HttpParams(); 
    param = param.append('appointment_id', appointment_id );
    return this._http.get<any>(this._url_get_appointment_services, {params:param});
  }

  get_station_id(user_email:any){
    var param = new HttpParams();
    param = param.append('email', user_email );
    return this._http.get<any>(this._url_get_station_id, {params:param});
  }


}
