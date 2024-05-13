import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


@Injectable()
export class LoginService{

    constructor(private router:Router){}

    token!: string;

    //DOCUMENTACION: https://firebase.google.com/docs/auth/web/password-auth?hl=es-419#web-namespaced-api
    login(email: string, password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
      
              user?.getIdToken().then(
                token => {
                  this.token = token;
                }
              )
      
              firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => {
                })
                .catch((error) => {
                });
      
              this.router.navigate(['/']);    // Redireccionar a la página correspondiente después del login
              resolve("Success");
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              reject(errorCode);
            });
        });
    }
      
    async resetPassword(email: string){
        return new Promise<string>((resolve, reject) => {
            firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                resolve("200");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                reject(errorCode);
            })
        });
    }
      
    
    getToken(){
        return this.token;
    }

}