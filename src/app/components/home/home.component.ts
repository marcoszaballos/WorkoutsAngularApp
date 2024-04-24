import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  activeIndex: number = -1;
  activeIndexEjercicio: number = -1;
  listGruposMusculares: any;
  listEjerciciosGrupoMuscular: any;
  ejercicioSeleccionado: boolean = false;

  constructor(private apiSerice: ApiService){  }

  ngOnInit(): void {
    this.getGruposMusculares();
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }
  setActiveEjercicio(index: number): void {
    this.activeIndexEjercicio = index;
    this.ejercicioSeleccionado = true;
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
}
