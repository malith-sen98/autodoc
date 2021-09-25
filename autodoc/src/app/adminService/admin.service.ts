import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  _url_getRequestedServiceStations =environment.apiUrl+'/getRequestedServiceStations';
  _url_get_details_of_req_station = environment.apiUrl+'/get_details_of_req_station';
  _url_getAllServiceStations = environment.apiUrl+'/getAllServiceStations';
  _url_getAllVehicleOwners = environment.apiUrl+'/getAllVehicleOwners';
  _url_post_ServiceStation = environment.apiUrl+'/post_ServiceStation';
  _url_post_serviceStation_services= environment.apiUrl+'/post_serviceStation_services';
  _url_remove_requested_station = environment.apiUrl+'/remove_requested_station';
  _url_insert_station_to_ratings = environment.apiUrl+'/insert_station_to_ratings';
  _url_insert_to_bays =environment.apiUrl+'/insert_to_bays';
  _url_update_account_table = environment.apiUrl+'/update_account_table';
  _url_send_accpeted_declined_mail= environment.apiUrl+'/send_accpeted_declined_mail';
  _url_delete_station=  environment.apiUrl+'/delete_station';
  _url_delete_owner = environment.apiUrl+'/delete_owner';

  constructor(private _http:HttpClient) { }

  getRequestedServiceStations(){

    // var param = new HttpParams();
    // param = param.append('userId', userIdfromSession );
    return this._http.get<any>(this._url_getRequestedServiceStations  );
  }

  get_details_of_req_station(reg_number:string){

    var param = new HttpParams();
    param = param.append('reg_number', reg_number );
    return this._http.get<any>(this._url_get_details_of_req_station , {params:param} );

  }

  getAllServiceStations(){
    return this._http.get<any>(this._url_getAllServiceStations  );
  }

  getAllVehicleOwners(){
    return this._http.get<any>(this._url_getAllVehicleOwners  );
  }

  post_ServiceStation(service_station_arr:any){
    return this._http.post<any>(this._url_post_ServiceStation , service_station_arr );
  }

  post_serviceStation_services(service_station_services_arr:any){
    return this._http.post<any>(this._url_post_serviceStation_services, service_station_services_arr);

  }

  remove_requested_station(reg_number:string){
    var param = new HttpParams();
    param = param.append('reg_number', reg_number );
    return this._http.delete<any>(this._url_remove_requested_station, {params:param} );
  }

  insert_station_to_ratings(pass_arr:any){
    return this._http.post<any>(this._url_insert_station_to_ratings , pass_arr );
  }

  insert_to_bays(arr_bays:any){
    return this._http.post<any>(this._url_insert_to_bays , arr_bays );
  }

  update_account_table(account_email_accpt_arr:any){
    return this._http.post<any>(this._url_update_account_table , account_email_accpt_arr );
  }

  send_accpeted_declined_mail(account_email_arr){
    console.log("send email declined/accept service called");
    return this._http.post<any>(this._url_send_accpeted_declined_mail, account_email_arr);
  }

  delete_station(st_id:any){
    var param = new HttpParams();
    param = param.append('st_id', st_id );
    return this._http.delete<any>(this._url_delete_station, {params:param} );
  }

  delete_owner(owner_id:any){
    var param = new HttpParams();
    param = param.append('owner_id', owner_id );
    return this._http.delete<any>(this._url_delete_owner, {params:param} );
  }


}
