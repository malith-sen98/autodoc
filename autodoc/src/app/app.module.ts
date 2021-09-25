import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MaterialModule } from './material.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';  
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookingComponent } from './components/pages/booking/booking.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StationeditComponent } from './components/pages/stationedit/stationedit.component';
import { SchedulebookComponent } from './components/pages/schedulebook/schedulebook.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
// import { MatDatepicker } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { EditownerComponent } from './components/pages/editowner/editowner.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StationprofileComponent } from './components/pages/stationprofile/stationprofile.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
//import { Changepassword } from './components/pages/stationedit/stationedit.component';
import { Changepassowner } from './components/pages/editowner/editowner.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { AboutComponent } from './components/pages/about/about.component';
import { EmployeedetailsComponent } from './components/pages/employeedetails/employeedetails.component';
import { AddCarBookingComponent } from './components/pages/booking/booking.component';
import { BillingComponent } from './components/pages/billing/billing.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminpanelComponent } from './components/pages/adminpanel/adminpanel.component';
import { Servicerequestview } from './components/pages/adminpanel/adminpanel.component';
import { MatDialogModule } from '@angular/material/dialog';
//import { Login } from './components/header/header.component';
import { Ratingpopup } from './components/pages/profile/profile.component';
import { AddVehicleEditComponent } from './components/pages/editowner/editowner.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RegisterComponent } from './components/pages/register/register.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';
import { AddinventoryComponent } from './components/pages/addinventory/addinventory.component';
import { EditinventoryComponent } from './components/pages/editinventory/editinventory.component';
import { TimeslotComponent } from './components/pages/schedulebook/schedulebook.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component'; 
import { EditemployeeComponent } from './components/pages/employeedetails/employeedetails.component';
import { AddemployeeComponent } from './components/pages/employeedetails/employeedetails.component';
import { EditempComponent } from './components/pages/employeedetails/employeedetails.component';

import { AddCustomerComponent } from './components/pages/billing/add-customer/add-customer.component';
import { AddQtyComponent } from './components/pages/billing/add-qty/add-qty.component';
import { DialogOverviewComponent } from './components/pages/billing/dialog-overview/dialog-overview.component';
import { EditPercentageComponent } from './components/pages/billing/edit-percentage/edit-percentage.component';
import { DatePipe } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './helpers';
import { AccountService } from './services';
import { AddServicesComponent } from './components/pages/stationprofile/add-services/add-services.component';
import { ChangepasswordComponent } from './components/pages/stationedit/changepassword/changepassword.component';
import { ViewBillsComponent } from './components/pages/billing/view-bills/view-bills.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    StationeditComponent,
    SchedulebookComponent,
    ProfileComponent,
    EditownerComponent,
    StationprofileComponent,
    //Changepassword,
    Changepassowner,
    ServicesComponent,
    AboutComponent,
    EmployeedetailsComponent,
    AddCarBookingComponent,
    BillingComponent,
    AdminpanelComponent,
    Servicerequestview,
    //Login,
    Ratingpopup,
    AddVehicleEditComponent,
    RegisterComponent,
    InventoryComponent,
    AddinventoryComponent,
    EditinventoryComponent,
    TimeslotComponent,
    NotificationsComponent,
    EditemployeeComponent,
    AddemployeeComponent,
    EditempComponent,
    AddCustomerComponent,
    AddQtyComponent,
    DialogOverviewComponent,
    EditPercentageComponent,
    AlertComponent,
    AddServicesComponent,
    ChangepasswordComponent,
    ViewBillsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatMenuModule,
    MatTabsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
    MatStepperModule,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    // MatDatepicker
    
  ],
  providers: [
    DatePipe,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
