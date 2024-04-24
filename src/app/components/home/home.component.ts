import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

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


  constructor(private apiSerice: ApiService){  }

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
    this.apiSerice
    .getListGruposMusculares()
    .subscribe(resp => {
      this.listGruposMusculares = resp;

      console.log(this.listGruposMusculares)
    });
  }

  getEjerciciosGrupoMuscular(grupoMuscular: string){
    this.apiSerice
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
} 
