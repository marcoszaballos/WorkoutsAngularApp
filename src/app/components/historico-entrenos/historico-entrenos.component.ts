import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-historico-entrenos',
  templateUrl: './historico-entrenos.component.html',
  styleUrl: './historico-entrenos.component.css'
})
export class HistoricoEntrenosComponent {

  listHistoricoEntrenos: any;       //Dias con entradas de entrenamientos
  listEjerciciosPorFecha: any;      //Listado de ejercicios por dia
  userEmail: string | null = null;
  ultimoEntreno: any;               //Fecha del último elemento de la lista que se ha clicado (para mostrar la fecha en el modal)

  constructor(private apiService: ApiService, private authService: AuthService){  }
  ngOnInit(): void {
    // Obtener el correo electrónico de manera síncrona
    this.authService.getUserEmail().then(email => {
      this.userEmail = email;

      this.getGruposMusculares(this.userEmail);
    });
  }

  openModal(fecha: string, userEmail: any){
    this.ultimoEntreno = fecha;

    this.apiService
    .getHistoricoEjerciciosFilterByDate(fecha, userEmail)
    .subscribe(resp => {
      this.listEjerciciosPorFecha = resp;

    });
  }

  getGruposMusculares(userEmail: any){
    this.apiService
    .getHistoricoEjerciciosGroupByDate(userEmail)
    .subscribe(resp => {
      this.listHistoricoEntrenos = resp;

    });
  }
}
