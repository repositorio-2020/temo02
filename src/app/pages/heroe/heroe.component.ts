import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserModel } from 'src/app/models/UserModel.model';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  usuario: UserModel = new UserModel();


  constructor( private usuariosService: UserService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.usuariosService.getUser( id )
        .subscribe( (resp: UserModel) => {
          this.usuario = resp;
        //  this.heroe.id = id;
        });

    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.usuario.id ) {
      peticion = this.usuariosService.actualizarUser( this.usuario );
    } else {
      peticion = this.usuariosService.crearUser( this.usuario );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.usuario.name,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }

}
