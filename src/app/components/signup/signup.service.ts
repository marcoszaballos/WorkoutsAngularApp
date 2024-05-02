import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';

@Injectable()
export class SignUpService{

    constructor(private router:Router){}

    token!: string;

    //DOCUMENTACION: https://firebase.google.com/docs/auth/web/password-auth?hl=es-419#web-namespaced-api
    async signUp(email:string, password:string){
        console.log("SignUpService.signUp ...");

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;

                user?.getIdToken().then(
                    token=>{
                        this.token=token;
                        console.log(token);
                    }
                )

                console.log("REGISTRADO: "+user);

                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => {
                        console.log("Persistencia de sesión del usuario: ", firebase.auth.Auth.Persistence.LOCAL);
                    })
                    .catch((error) => {
                        console.log("Error de persistencia de sesión del usuario: ", error);
                    });
                    
                this.router.navigate(['/']);    //Redireccionar a la página correspondiente después del login
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("ERROR: Code: "+errorCode+" - Message: "+errorMessage);
                //TODO: Mostrar mensaje de error al usuario
            });
    }

}