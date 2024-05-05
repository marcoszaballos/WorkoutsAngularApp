import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HistoricoEntrenosComponent } from './components/historico-entrenos/historico-entrenos.component';

const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "historico-entrenos", component: HistoricoEntrenosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
