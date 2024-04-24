import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  listGruposMusculares: any;
  listEjerciciosGrupoMuscular: any;

  constructor(private apiSerice: ApiService){  }

  ngOnInit(): void {
    this.getGruposMusculares();
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
