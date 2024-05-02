import { Component } from '@angular/core';
import { SignUpService } from './signup.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email!: string;
  password!: string;

  constructor(private signupService:SignUpService){ }

  ngOnInit(): void{

  }

  signup(form: NgForm){
    console.log("SignupComponent.signup ...");

    const email = form.value.email
    const pass = form.value.password

    this.signupService.signUp(email, pass);
  }

}
