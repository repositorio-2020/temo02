import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/UserModel.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  heroes: any[] = [];
  cargando = false;


  constructor( private heroesService: UserService ) { }

  ngOnInit() {


    console.log("Estoy en el constructotr " )
    this.cargando = true;
    this.heroesService.getUsers().subscribe( (resp: any[]) => {
        console.log(resp);
        this.heroes = resp;
        console.log(this.heroes);
        this.cargando = false;
      });

     this.cargando = false;

  }

  borrarHeroe( heroe: UserModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ heroe.name }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarUser( heroe.id ).subscribe();
      }

    });



  }


}
