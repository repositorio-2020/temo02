import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/UserModel.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

//  private url = '/api/v1/users';   
  private url = '/api/v1/users';   
  


  constructor( private http: HttpClient ) { }

  usuarios: UserModel[] = [];


  crearUser( user: UserModel ) {


   console.log(user);

    return this.http.post(`${ this.url }`, user)
            .pipe(
              map( (resp: any) => {
//                user.id = resp.id;
                return resp;
              })
            );

  }

  actualizarUser( user: UserModel ) {

    const userTemp = {
      ...user
    };

    delete userTemp.id;

    return this.http.put(`${ this.url }/${ user.id }`, userTemp);


  }

  borrarUser( id: number ) {

    return this.http.delete(`${ this.url }/${ id }`);



  }


  getUser( id: string ) {



    console.log(`${ this.url }/${ id }`);
    return this.http.get(`${ this.url }/${ id }`);



  }


  getUsers() {

  



   return this.http.get(this.url);
 
 } 



  

  private crearArreglo( usersObj: object ) {


    console.log("Estoy en el crear arreglo " + usersObj );

    const users: UserModel[] = [];

    Object.keys( usersObj ).forEach( key => {

      const user: UserModel = usersObj[key];
     // user.id = key;

     users.push( user );
    });


    return users;

  }




}
