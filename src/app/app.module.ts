import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewChild } from "@angular/core/src/metadata/di";
import { Directive, Renderer, ElementRef } from '@angular/core';

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
import { DetailComponent } from './Components/Back/detail/detail.component';
import { ProfileComponent } from './Components/Back/profile/profile.component';
import { UploadComponent } from './Components/Back/upload/upload.component';
import { NotificationComponent } from './Components/Back/notification/notification.component';
import { SettingsComponent } from './Components/Back/settings/settings.component';
import { EditComponent } from './Components/Back/edit/edit.component';

const appRoutes: Routes = [
  { path: '', component: FrontComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset/password', component: ResetComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'test', component: NotificationComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'project/detail/:id', component: DetailComponent },
  { path: 'project/edit/:id', component: EditComponent },
  { path: 'user/my/profile', component: ProfileComponent }
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
    NavigationComponent,
    DetailComponent,
    ProfileComponent,
    UploadComponent,
    NotificationComponent,
    SettingsComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
     appRoutes,
     { enableTracing: false } // <-- debugging purposes only
   )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
