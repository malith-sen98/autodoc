import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/pages/booking/booking.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { EditownerComponent } from './components/pages/editowner/editowner.component';
import { StationeditComponent } from './components/pages/stationedit/stationedit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SchedulebookComponent } from './components/pages/schedulebook/schedulebook.component';
import { StationprofileComponent } from './components/pages/stationprofile/stationprofile.component';
//import { Changepassword } from './components/pages/stationedit/stationedit.component';
import { Changepassowner } from './components/pages/editowner/editowner.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { AboutComponent } from './components/pages/about/about.component';
import { EmployeedetailsComponent } from './components/pages/employeedetails/employeedetails.component';
import { AddCarBookingComponent } from './components/pages/booking/booking.component'; 
import { BillingComponent } from './components/pages/billing/billing.component';
import { AdminpanelComponent } from './components/pages/adminpanel/adminpanel.component';
import { Servicerequestview } from './components/pages/adminpanel/adminpanel.component';
//import { Login } from './components/header/header.component';
import { Ratingpopup } from './components/pages/profile/profile.component';
import { AddVehicleEditComponent } from './components/pages/editowner/editowner.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';
import { AddinventoryComponent } from './components/pages/addinventory/addinventory.component';
import { EditinventoryComponent } from './components/pages/editinventory/editinventory.component';
import { TimeslotComponent } from './components/pages/schedulebook/schedulebook.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component';
import { EditemployeeComponent } from './components/pages/employeedetails/employeedetails.component';
import { AddemployeeComponent } from './components/pages/employeedetails/employeedetails.component';
import { EditempComponent } from './components/pages/employeedetails/employeedetails.component';
import { ViewBillsComponent } from './components/pages/billing/view-bills/view-bills.component';
// import { Home } from './pages/home';

import { AuthGuard } from './helpers';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);

const routes: Routes = [
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent},
  { path: 'stationedit', component: StationeditComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'editowner/:owner_id', component: EditownerComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'schedulebook', component: SchedulebookComponent},
  { path: 'stationprofile', component: StationprofileComponent},
  //{ path: 'changepassword', component: Changepassword},
  { path: 'changepassowner', component: Changepassowner },
  { path: 'services', component: ServicesComponent},
  { path: 'about', component: AboutComponent},
  { path: 'employeedetails', component: EmployeedetailsComponent},
  { path: 'addcarbooking', component: AddCarBookingComponent},
  { path: 'billing', component: BillingComponent},
  { path: 'adminpanel', component: AdminpanelComponent},
  { path: 'servicerequestview', component: Servicerequestview},
  //{ path: 'login', component: Login},
  { path: 'ratingspopup', component: Ratingpopup},
  { path: 'addvehicleedit', component: AddVehicleEditComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'addinventory', component: AddinventoryComponent},
  { path: 'editinventory', component: EditinventoryComponent},
  { path: 'timeslot', component: TimeslotComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'addemployee', component: AddemployeeComponent },
  { path: 'editemployee', component: EditemployeeComponent },
  { path: 'employeedetails', component: EmployeedetailsComponent },
  { path: 'editemp', component: EditempComponent},
  { path: 'account', loadChildren: accountModule },
  { path: 'viewbill', component: ViewBillsComponent},
  
// otherwise redirect to home
{ path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
