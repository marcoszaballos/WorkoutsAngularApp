import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Console } from 'console';

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
  listUltimoEntrenoGrupoMuscular: any; //Listado de grupos musculares y su fecha de último entreno
  listUltimoEntrenoEjercicio: any; //Listado de ejercicios y su fecha de último entreno

  ejercicioSeleccionado: boolean = false;
  ocultarEjercicios: boolean = true;  //Oculta el div

  isLoggedIn: boolean = false;
  userEmail: any;
  
  constructor(private apiService: ApiService, private loginService: LoginService, private authService: AuthService, private router:Router){
    this.authService.checkAuthState().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if(loggedIn){
        // Obtener el correo electrónico de manera síncrona
        this.authService.getUserEmail().then(email => {
          this.userEmail = email;
        });
      }
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

  async getGruposMusculares(){
    this.apiService
    .getListGruposMusculares()
    .subscribe(async resp => {
      this.listGruposMusculares = resp;
      
      //Obtenemos el email de manera síncrona
      await this.authService.getUserEmail().then(email => {
        this.userEmail=email;
      });
      if(this.userEmail){
        this.getFechaUltimoEntrenoGrupoMuscular(this.userEmail).then(undefined => {
          //Objeto que informaremos con todos los grupos musculares y opcionalmente la fecha del último entreno
          interface Registro {
            NOMBRE: string;
            FECHA: string;
          }

          const registros: Registro[] = [];
          for(const grupoMuscular of this.listGruposMusculares){
            let fechaUltimoEntreno: any;
            for(const ultimoEntreno of this.listUltimoEntrenoGrupoMuscular){
              if(grupoMuscular.NOMBRE === ultimoEntreno.GRUPO_MUSCULAR){
                fechaUltimoEntreno = ultimoEntreno.ULTIMO_ENTRENO
              }
            }
            registros.push({ NOMBRE: grupoMuscular.NOMBRE, FECHA: fechaUltimoEntreno});
          }
          this.listGruposMusculares=registros;
        });
      }    //Recuperamos las fechas únicamente si la sesión está iniciada
    });
  }

  async getEjerciciosGrupoMuscular(grupoMuscular: string){
    this.apiService
    .getListEjerciciosPorGrupoMuscular(grupoMuscular)
    .subscribe(async resp => {
      this.listEjerciciosGrupoMuscular = resp;

      //Obtenemos el email de manera síncrona
      await this.authService.getUserEmail().then(email => {
        this.userEmail=email;
      });
      if(this.userEmail){
        this.getFechaUltimoEntrenoEjercicio(grupoMuscular, this.userEmail).then(undefined => {
          //Objeto que informaremos con todos los grupos musculares y opcionalmente la fecha del último entreno
          interface Registro {
            EJERCICIO: string;
            FECHA: string;
          }

          const registros: Registro[] = [];
          for(const ejercicio of this.listEjerciciosGrupoMuscular){
            let fechaUltimoEntreno: any;
            for(const ultimoEntreno of this.listUltimoEntrenoEjercicio){
              if(ejercicio.EJERCICIO === ultimoEntreno.EJERCICIO){
                fechaUltimoEntreno = ultimoEntreno.ULTIMO_ENTRENO
              }
            }
            registros.push({ EJERCICIO: ejercicio.EJERCICIO, FECHA: fechaUltimoEntreno});
          }
          this.listEjerciciosGrupoMuscular=registros;
        });
      }
    });
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
    } else if (this.userEmail) {
      this.apiService.insertEjercicios(this.listEjerciciosAgregados, this.userEmail).subscribe(
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
  }
  
  getFechaUltimoEntrenoGrupoMuscular(userEmail: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userEmail) {
        this.apiService.getFechaUltimoEntrenoGrupoMuscular(userEmail)
          .subscribe(resp => {
            this.listUltimoEntrenoGrupoMuscular = resp;
            
            resolve(undefined);
          }, error => {
            reject(error);
          });
      } else {
        reject('No se proporcionó un correo electrónico');
      }
    });
  }

  getFechaUltimoEntrenoEjercicio(grupoMuscular: string, userEmail: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if(userEmail){ 
        this.apiService.getFechaUltimoEntrenoEjercicio(grupoMuscular, userEmail)
        .subscribe(resp => {
          this.listUltimoEntrenoEjercicio = resp;
    
          resolve(undefined);
        }, error => {
          reject(error);
        });
      }    
    });
  }

} 
