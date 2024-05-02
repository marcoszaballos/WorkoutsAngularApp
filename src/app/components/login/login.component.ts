import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private loginService:LoginService){ }

  ngOnInit(): void{

  }

  login(form: NgForm){
    const email = form.value.email
    const pass = form.value.password

    this.loginService.login(email, pass);
  }

}
