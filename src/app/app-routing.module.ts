import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/pages/booking/booking.component';
import { RegisterComponent } from './components/pages/register/register.component';

// import { Home } from './pages/home';

const routes: Routes = [
  { path: 'booking', component: BookingComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'second-component', component: SecondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
