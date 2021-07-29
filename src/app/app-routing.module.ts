import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/pages/booking/booking.component';
import { HomeComponent } from './components/pages/home/home.component';
import { StationeditComponent } from './components/pages/stationedit/stationedit.component';
import { SchedulebookComponent } from './components/pages/schedulebook/schedulebook.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/pages/profile/profile.component';


// import { Home } from './pages/home';

const routes: Routes = [
  { path: 'booking', component: BookingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'stationedit', component: StationeditComponent},
  { path: 'schedulebook', component: SchedulebookComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'profile', component: ProfileComponent},
 
  // { path: 'second-component', component: SecondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
