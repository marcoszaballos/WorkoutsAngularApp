import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
