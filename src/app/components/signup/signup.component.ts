import { Component } from '@angular/core';
import { SignUpService } from './signup.service';
import { NgForm } from '@angular/forms';
import { Constants } from '../../constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email!: string;
  password!: string;
  
  errorMessage: any;
  message: any;

  constructor(private signupService:SignUpService){ }

  ngOnInit(): void{

  }

  signup(form: NgForm){
    console.log("SignupComponent.signup ...");

    const email = form.value.email
    const pass = form.value.password

    this.signupService.signUp(email, pass)
    .catch((error) => {
      if (error === Constants.ERROR_WEAK_CREDENTIALS) {
        this.errorMessage = "La contraseña debe tener al menos 6 caracteres";
      } else if (error === Constants.ERROR_INVALID_EMAIL) {
        this.errorMessage = "El formato del email es incorrecto";
      } else if (error === Constants.ERROR_EMAIL_IN_USE) {
        this.errorMessage = "Este email ya está registrado";
      } else {
        console.error(error);
        this.errorMessage = "Error general. Inténtalo de nuevo.";
      }
    });
  }

}
