import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  activeIndexMusculo: number = -1;  //Musculo seleccionado
  activeIndexEjercicio: number = -1;//Ejercicio seleccionado

  listGruposMusculares: any;        //Lista de grupos musculares
  listEjerciciosGrupoMuscular: any; //Lista de ejercicios
  listEjerciciosAgregados: any[] = new Array();     //Lista de ejercicios añadidos

  ejercicioSeleccionado: boolean = false;
  ocultarEjercicios: boolean = true;  //Oculta el div

  isLoggedIn: boolean = false;

  constructor(private apiService: ApiService, private loginService: LoginService, private authService: AuthService, private router:Router){
    this.authService.checkAuthState().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    this.getGruposMusculares();
  }

  setActive(index: number): void {
    this.activeIndexMusculo = index;
    this.activeIndexEjercicio = -1
    this.ocultarEjercicios = false;
  }
  setActiveEjercicio(index: number): void {
    this.activeIndexEjercicio = index;
    this.ejercicioSeleccionado = true;
    console.log(this.ejercicioSeleccionado)
  }

  getGruposMusculares(){
    this.apiService
    .getListGruposMusculares()
    .subscribe(resp => {
      this.listGruposMusculares = resp;

      console.log(this.listGruposMusculares)
    });
  }

  getEjerciciosGrupoMuscular(grupoMuscular: string){
    this.apiService
    .getListEjerciciosPorGrupoMuscular(grupoMuscular)
    .subscribe(resp => {
      this.listEjerciciosGrupoMuscular = resp;

      console.log(this.listEjerciciosGrupoMuscular)
    })
  }

  addEjercicio(){
    this.listEjerciciosAgregados.push(this.listEjerciciosGrupoMuscular[this.activeIndexEjercicio]);

    //Reiniciamos las listas
    this.activeIndexMusculo = -1;
    this.activeIndexEjercicio = -1;
    this.ejercicioSeleccionado = false;
    this.listEjerciciosGrupoMuscular = null;
    this.ocultarEjercicios = true;

    console.log(this.ocultarEjercicios, this.ejercicioSeleccionado)
  }

  vaciarLista(){
    this.listEjerciciosAgregados = new Array();
    this.ocultarEjercicios = true;
  }

  insertEjercicios(): void {
    if(!this.isLoggedIn){ //Redirigimos al login si no está la sesión iniciada
      this.router.navigate(['/login']); 
    } else {
      let userEmail: string | null = null;
    
      // Obtener el correo electrónico de manera síncrona
      this.authService.getUserEmail().then(email => {
        userEmail = email;

        if (userEmail) {
          this.apiService.insertEjercicios(this.listEjerciciosAgregados, userEmail).subscribe(
            response => {
              // Manejar la respuesta del servidor si es necesario
              console.log('Petición insert ejecutada, respuesta: ', response);
              // TODO: Mostrar mensaje por pantalla
            },
            error => {
              console.error('Error al añadir ejercicios: ', error);
              // TODO: Mostrar mensaje por pantalla
            }
          );
        } else {
          console.error('No se pudo obtener el correo electrónico del usuario.');
          // TODO: Mostrar mensaje por pantalla
        }
      });
    }
  }
  
} 
