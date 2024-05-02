import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  // Método para verificar el estado de autenticación del usuario
  checkAuthState(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  // Método para obtener el email del usuario autenticado
  getUserEmail(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(user.email);
        } else {
          resolve(null);
        }
      }, error => {
        reject(error);
      });
    });
  }

  // Método para cerrar sesión
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
