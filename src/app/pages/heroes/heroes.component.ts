import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
import {HeroeModel} from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;

    this.heroesService.getHeroes().subscribe(
      resp => {
        console.log(resp);
        this.heroes = resp;
        this.cargando = false;
      });
  }

  borrarHeroe(heroe: HeroeModel, posicion: number): void{
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value){
        // Realizo el borrado del arreglo en pantalla.
        this.heroes.splice(posicion, 1);
        console.log('el id del heroe a borrar es ' + heroe.id);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });
  }

}
