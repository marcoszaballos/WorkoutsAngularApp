import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getByUrl(url: string){
    return this.http.get(url);
  }

  public getListGruposMusculares(){
    return this.http.get(Constants.BASE_URL+Constants.GET_GRUPOS_MUSCULARES);
  }

  public getListEjercicios(){
    return this.http.get(Constants.BASE_URL+Constants.GET_LISTA_EJERCICIOS);
  }

  public getListEjerciciosPorGrupoMuscular(grupoMuscular: string){
    return this.http.get(Constants.BASE_URL+Constants.GET_EJERCICIOS_GRUPO_MUSCULAR+grupoMuscular);
  }
}
