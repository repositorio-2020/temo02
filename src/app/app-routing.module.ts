import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';

import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';


const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'usuarios' }
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes )     
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
