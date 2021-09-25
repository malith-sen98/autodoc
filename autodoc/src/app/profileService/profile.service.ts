import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  _url ="";
  _url_getUserDetails =environment.apiUrl+'/getUserDetails';
  _url_getVehicleDetails = environment.apiUrl+'/getVehicleDetails';
  _url_getAppointments =  environment.apiUrl+'/getAppointments';
  _url_Update_confirm_edit = environment.apiUrl+'/Update_confirm_edit';
  _url_update_user_img = environment.apiUrl+'/update_user_img';
  _url_Remove_Vehicle=environment.apiUrl+'/Remove_Vehicle';
  _url_getRating = environment.apiUrl+'/getRating';
  _url_post_rating= environment.apiUrl+'/post_rating';
  _url_post_appointment_rated =  environment.apiUrl+'/post_appointment_rated';
  _url_Remove_Appointment = environment.apiUrl+'/Remove_Appointment';


  constructor(private _http:HttpClient) { }

  enroll(fromBookTestArray: Array<string>) {
    
    return this._http.post<any>(this._url,fromBookTestArray);
  }

  getUserDetails(userIdfromSession: number){

    var param = new HttpParams();
    param = param.append('userId', userIdfromSession );
    
    return this._http.get<any>(this._url_getUserDetails, {params:param});
  }

  getVehicleDetails(userIdfromSession:number){
    var param = new HttpParams();
    param = param.append('userId', userIdfromSession );
    return this._http.get<any>(this._url_getVehicleDetails, {params:param});

  }
  getAppointments(userIdfromSession:number){
    var param = new HttpParams();
    param = param.append('userId', userIdfromSession );
    return this._http.get<any>(this._url_getAppointments, {params:param});
  }

  Update_confirm_edit(final_arr:any){

    console.log(final_arr);
    return this._http.post<any>(this._url_Update_confirm_edit, final_arr);
  }


  update_user_img(file:FormData){
  
    console.log(file);
    return this._http.post<any>(this._url_update_user_img, file);

  }

  Remove_Vehicle(vehicle_number:number){
    var param = new HttpParams();
    param = param.append('vehicle_number', vehicle_number );
    return this._http.delete<any>(this._url_Remove_Vehicle, {params:param});
  }

  getRating(st_id:number){
    var param = new HttpParams();
    param = param.append('st_id', st_id );
    return this._http.get<any>(this._url_getRating, {params:param});
  }

  post_rating(final_rating_row:any){
    return this._http.post<any>(this._url_post_rating, final_rating_row);
  }

  post_appointment_rated(appointment_id_IN_arr:any){
    return this._http.post<any>(this._url_post_appointment_rated, appointment_id_IN_arr);
  }

  Remove_Appointment(appointment_id:any){
    var param = new HttpParams();
    param = param.append('appointment_id', appointment_id );
    return this._http.delete<any>(this._url_Remove_Appointment, {params:param});
  }

}

