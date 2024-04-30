import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import { LoginService } from './components/login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule ,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    DataService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
