import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioApp } from '../classes/UsuarioApp';

@IonicPage()
@Component({
  selector: 'page-diario-historico',
  templateUrl: 'diario-historico.html',
})
export class DiarioHistoricoPage {

  usuario: UsuarioApp;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _serviceUsuario: UsuarioService) {
    this.usuario = this._serviceUsuario.usuario;
  }


}
