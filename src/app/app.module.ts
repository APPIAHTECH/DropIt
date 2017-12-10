import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './Components/app.component';
import { NavComponent } from './Components/Front/nav/nav.component';
import { SliderComponent } from './Components/Front/slider/slider.component';
import { FooterComponent } from './Components/Front/footer/footer.component';
import { LoginComponent } from './Components/Front/login/login.component';
import { FrontComponent } from './Components/Front/front/front.component';
import { SignupComponent } from './Components/Front/signup/signup.component';
import { ResetComponent } from './Components/Front/reset/reset.component';
import { DashboardComponent } from './Components/Back/dashboard/dashboard.component';
import { NavigationComponent } from './Components/Back/navigation/navigation.component';

const appRoutes: Routes = [
  { path: '', component: FrontComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset/password', component: ResetComponent },

  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SliderComponent,
    FooterComponent,
    LoginComponent,
    FrontComponent,
    SignupComponent,
    ResetComponent,
    DashboardComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
     appRoutes,
     { enableTracing: true } // <-- debugging purposes only
   )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
