import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Observable } from 'rxjs';

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

  public getHistoricoEjerciciosGroupByDate(userEmail: string){
    return this.http.get(Constants.BASE_URL+Constants.GET_HISTORICO_EJERCICIOS_GROUP_BY_DATE+userEmail);
  }

  public getHistoricoEjerciciosFilterByDate(fecha: string, userEmail: string){
    return this.http.get(Constants.BASE_URL+Constants.GET_HISTORICO_EJERCICIOS_FILTER_BY_DATE+fecha+"&"+Constants.USER_EMAIL+"="+userEmail);
  }

  //Insertar los registros en base de datos
  public insertEjercicios(listaEjercicios: any[], userEmail: string, fecha: Date): Observable<any> {
    const listaEjerciciosAndEmail = {
      ejercicios: listaEjercicios,
      email: userEmail,
      fecha: this.formatFecha(fecha)
    };

    return this.http.post<any>(Constants.BASE_URL+Constants.INSERT_EJERCICIOS_USUARIO, listaEjerciciosAndEmail);
  }

  public getFechaUltimoEntrenoGrupoMuscular(userEmail: string){
    return this.http.get(Constants.BASE_URL+Constants.GET_FECHA_ULTIMO_ENTRENO_GRUPO_MUSCULAR+userEmail);
  }

  public getFechaUltimoEntrenoEjercicio(grupoMuscular: string, userEmail: string){
    return this.http.get(Constants.BASE_URL+Constants.GET_FECHA_ULTIMO_ENTRENO_EJERCICIO+Constants.GRUPO_MUSCULAR+"="+grupoMuscular+"&"+Constants.USER_EMAIL+"="+userEmail);
    }

  formatFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);
    const hours = ('0' + fecha.getHours()).slice(-2);
    const minutes = ('0' + fecha.getMinutes()).slice(-2);
    const seconds = ('0' + fecha.getSeconds()).slice(-2);
    const milliseconds = ('00' + fecha.getMilliseconds()).slice(-3);
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}
