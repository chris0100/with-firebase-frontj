import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HeroeModel} from '../models/heroe.model';
import {catchError, delay, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class HeroesService {

  private url = 'https://curso-crud-4acb9-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }


  // Metodo para crear el heroe
  crearHeroe(heroe: HeroeModel): any{
    const urlApi = 'http://localhost:8083/heroe';
    return this.http.post(`${urlApi}`, heroe)
      .pipe(
        catchError(err => {
          if (err.status === 400){
            Swal.fire({
              title: 'Error',
              text: err.error.errors[0],
              icon: 'error',
              showConfirmButton: true
            });
          }
          return throwError(err);
        })
      );
  }


  // Metodo para editar el heroe
  actualizarHeroe(heroe: HeroeModel): Observable<HeroeModel> {
    const urlApi = 'http://localhost:8083/heroe';
    // con los puntos suspensivos toma todas las propiedades de heroe y las asigna a heroeTemp
    const heroeTemp = {
      ...heroe
    };

    // se elimina el id de heroetemp
    // delete heroeTemp.id;
    return this.http.put<HeroeModel>(`${urlApi}`, heroe).pipe(
      catchError(err => {
        Swal.fire('Error', err.mensaje, 'error');
        return throwError(err);
      })
    );
  }


  // Metodo para obtener los heroes
  getHeroes(): Observable<HeroeModel[]>{
    const urlApi = 'http://localhost:8083/heroes';
    return this.http.get<HeroeModel[]>(`${urlApi}`)
      .pipe(
        // map(this.crearArreglo),   // pasa de forma abreviada.
        delay(1500),
        catchError(err => {
          Swal.fire('Error', err.mensaje, 'error');
          return throwError(err);
        })
      );
  }

  // Crea el arreglo de forma correcta
  private crearArreglo(heroesObj: object): HeroeModel[]{

    const heroes: HeroeModel[] = [];
    console.log(heroesObj);

    // Si viene vacio, retorna el arreglo vacio
    if (heroesObj === null){
      return [];
    }

    // Se extrae el objeto y se toma una nueva referencia
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      console.log('esta es la key:' + key);
      console.log('sobre escribe esto:' + heroe.id);
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }


  // Obtener el heroe por id
  getHeroe(id: string): Observable<HeroeModel> {
    const urlApi = 'http://localhost:8083/heroe';
    return this.http.get<HeroeModel>(`${urlApi}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }


  // Borrar el heroe por medio del id
  borrarHeroe(id: string): Observable<HeroeModel>{
    const urlApi = 'http://localhost:8083/heroe';
    return this.http.delete<HeroeModel>(`${urlApi}/${id}`).pipe(
      catchError(err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }





}
