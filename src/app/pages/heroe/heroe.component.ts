import {Component, OnInit} from '@angular/core';
import {HeroeModel} from '../../models/heroe.model';
import {NgForm} from '@angular/forms';
import {HeroesService} from '../../services/heroes.service';
import Swal from 'sweetalert2';
import {icon} from '@fortawesome/fontawesome-svg-core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})


export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // toma los datos de la ruta del id, sin necesidad de suscribirse.
    const id = this.route.snapshot.paramMap.get('id');

    // Si el id es para editar, trae el heroe del servicio
    if (id !== 'nuevo') {
      this.heroesService.getHeroe(id)
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp; // lo añade al objeto de heroe que esta creado.
          this.heroe.id = id; // añade el id de la ruta.
        });
    }
  }



  guardar(form: NgForm): void {

    if (form.invalid){
      console.log('formulario invalido');
      return;
    }

/*    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      allowOutsideClick: false,
      icon: 'info'
    });
    Swal.showLoading();*/


    let peticion: Observable<any>;

    // Si existe el id, lo edita
    if (this.heroe.id){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    }
    else{
      // Se llama al metodo de crear en el servicio
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    // Se ejecuta el subscribe en este punto para aplicarse en definicion de variables
    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: resp.mensaje,
        icon: 'success'
      });
      console.log(resp);
    });
  }



}
