import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserModel } from 'src/app/models/UserModel.model';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: UserModel = new UserModel();
  adiciona: boolean ;


  constructor( private usuariosService: UserService,
               private route: ActivatedRoute ) { }

  ngOnInit() {


    this.adiciona = false;
    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);

    if ( id !== 'nuevo' ) {

      this.usuariosService.getUser( id )
        .subscribe( (resp: UserModel) => {
          this.usuario = resp;
          console.log("Dentro de la lectura getUser");
        });
        console.log("No se debe adicionar solo modificar");
      console.log(this.usuario);
      }
    else
    {
      console.log("Se debe adicionar");
      console.log(this.usuario);
      
      this.adiciona = true;
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

     if ( this.adiciona ) {
      peticion = this.usuariosService.crearUser( this.usuario );
    } else {
      peticion = this.usuariosService.actualizarUser( this.usuario );
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
