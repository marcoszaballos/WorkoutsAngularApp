import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Constants } from '../../constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  
  errorMessage: any;

  constructor(private loginService:LoginService){ }

  ngOnInit(): void{

  }

  login(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
  
    // Llamar a la función de inicio de sesión y manejar el resultado
    this.loginService.login(email, pass)
      .catch((error) => {
        if (error === Constants.ERROR_INVALID_CREDENTIALS) {
          this.errorMessage = "Email o contraseña incorrectos";
        } else if (error === Constants.ERROR_INVALID_EMAIL) {
          this.errorMessage = "El formato del email es incorrecto";
        } else {
          console.error(error);
          this.errorMessage = "Error general. Inténtalo de nuevo.";
        }
      });
  }
  
}
