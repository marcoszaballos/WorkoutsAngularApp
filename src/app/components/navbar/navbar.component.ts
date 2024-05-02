import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  email: string | null = null;


  constructor(private authService: AuthService) {
    this.authService.checkAuthState().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;

      // Si el usuario está autenticado, obtenemos su email
      if (loggedIn) {
        this.authService.getUserEmail().then(email => {
          this.email = email;
        });
      } else {
        this.email = null;
      }
    });
  }

  //Llama al método logout del servicio AuthService
  logout() {
    this.authService.logout(); 
  }
}
