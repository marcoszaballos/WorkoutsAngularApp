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
  warningMessage: any;
  infoMessage: any;

  constructor(private loginService:LoginService){ }

  ngOnInit(): void{

  }

  login(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
  
    // Llamar a la función de inicio de sesión y manejar el resultado
    this.loginService.login(email, pass)
      .catch((error) => {
        this.checkAuthError(error);
      });
  }

  resetPassword(email: string){
    if(email===undefined){
      this.errorMessage=Constants.ERROR_EMAIL_VACIO;
    } else {
      this.loginService.resetPassword(email)
      .then((msg)=>{
        this.resetMessages();
        this.infoMessage="Pronto recibirás un correo electrónico para restablecer tu constraseña"
      })
      .catch((error)=>{
        this.checkAuthError(error);
      })
    }
  }

  private checkAuthError(error: string){
    this.resetMessages();
    if (error === Constants.ERROR_INVALID_CREDENTIALS) {
      this.errorMessage = "Email o contraseña incorrectos";
    } else if (error === Constants.ERROR_INVALID_EMAIL) {
      this.errorMessage = "El formato del email es incorrecto";
    } else {
      this.errorMessage = "Error general. Inténtalo de nuevo.";
    }
  }

  private resetMessages(){
    this.errorMessage=undefined;
    this.infoMessage=undefined;
    this.warningMessage=undefined;
  }
  
}
