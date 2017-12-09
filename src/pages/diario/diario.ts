import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiarioHistoricoPage } from '../diario-historico/diario-historico';
import { UsuarioApp } from '../classes/UsuarioApp';
import { UsuarioService } from '../services/usuario.service';
import { DiarioSelecionaPassageiroPage } from '../diario-seleciona-passageiro/diario-seleciona-passageiro';

/**
 * Generated class for the DiarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diario',
  templateUrl: 'diario.html',
})
export class DiarioPage {

  usuario: UsuarioApp;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, public _serviceUsuario: UsuarioService) {
      this.usuario = this._serviceUsuario.usuario;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiarioPage');
  }

  diarioBordo(){
    this.navCtrl.push(this.usuario.tipoUsuario == 0 ? DiarioHistoricoPage : DiarioSelecionaPassageiroPage);
  }

}
