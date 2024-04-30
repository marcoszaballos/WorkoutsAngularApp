import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable()
export class LoginService{

    constructor(private router:Router){}

    token!: string;

    login(username:string, password:string){
        firebase.auth().signInWithEmailAndPassword(username, password).then(
            response=>{
                firebase.auth().currentUser?.getIdToken().then(
                    token=>{
                        this.token=token;
                        this.router.navigate(['/']);    //Redireccionar a la página correspondiente después del login
                        console.log(response);
                    }
                )
            }
        );
        
    }
    
    getToken(){
        return this.token;
    }

}