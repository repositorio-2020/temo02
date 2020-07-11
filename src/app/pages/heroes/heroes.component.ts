import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/UserModel.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: UserModel[] = [];
  cargando = false;


  constructor( private heroesService: UserService ) { }

  ngOnInit() {


    console.log("Estoy en el constructotr " )
    this.cargando = true;
    this.heroesService.getUsers();

    //  .subscribe( resp => {
    //    console.log(resp);
      //  this.heroes = resp;
    //    this.cargando = false;
    //  });

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
