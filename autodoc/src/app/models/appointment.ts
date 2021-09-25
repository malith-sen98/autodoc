import { Time } from "@angular/common";

export class Appointment {
    appointment_id?: number;
    date?: Date;
    time?: Time;
    reminder?: number;
    duration_hrs?: number;
    st_id?: number;
    bay_id?: number;
    vehicle_number?: string;
    
  }

 export class AppointRows {
    appointment_id?: number;
    date?: string;
    time?: string;
    reminder?: number;
    duration_hrs?: number;
    st_id?: number;
    bay_id?: number;
    vehicle_number?: string;
  }