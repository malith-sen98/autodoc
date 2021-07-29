import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';

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
    ProfileComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatMenuModule,
    MatTabsModule
    // MatDatepicker
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
