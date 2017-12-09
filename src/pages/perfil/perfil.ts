import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioApp } from '../classes/UsuarioApp';
import { UsuarioService } from '../services/usuario.service';
import { Veiculo } from '../classes/Veiculo';
import { Passageiro } from '../classes/Passageiro';
import { Motorista } from '../classes/Motorista';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  urlImagem: string;
  perfil: UsuarioApp;
  van: Veiculo;
  passageiro: Passageiro;
  motorista: Motorista;

  constructor( public navCtrl: NavController, public navParams: NavParams, public _serviceUsuario: UsuarioService) {
    debugger;
    this.perfil = this._serviceUsuario.usuario;
    this.van = new Veiculo();
    this.passageiro = new Passageiro();
    this.motorista = new Motorista();

    this.van = this._serviceUsuario.van;
    this.motorista = this._serviceUsuario.motorista;
    this.passageiro = this._serviceUsuario.passageiro;
    this.urlImagem = this.perfil.tipoUsuario == 1 ? "http://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Bus-icon.png" :
    this.perfil.tipoUsuario == 0 ? "https://image.flaticon.com/icons/png/512/201/201818.png" : "https://image.flaticon.com/icons/png/512/201/201818.png";
  }



}
