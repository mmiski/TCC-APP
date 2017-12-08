import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioApp } from '../classes/UsuarioApp';
import { UsuarioService } from '../services/usuario.service';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: UsuarioApp;

  constructor( public navCtrl: NavController, public navParams: NavParams, public _serviceUsuario: UsuarioService) {
    this.usuario = this._serviceUsuario.usuario;
  }



}
