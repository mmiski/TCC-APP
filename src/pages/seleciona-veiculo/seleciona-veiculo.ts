import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VeiculoService } from '../services/veiculo.service';
import { UsuarioService } from '../services/usuario.service';
import { FirebaseListObservable } from 'angularFire2/database';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-seleciona-veiculo',
  templateUrl: 'seleciona-veiculo.html',
})
export class SelecionaVeiculoPage {

  listaVeiculos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _serviceVeiculo: VeiculoService, public _serviceUsuario : UsuarioService) {
    this._serviceVeiculo.key = this._serviceUsuario.acesso.clienteKey;
    this.listaVeiculos = this._serviceVeiculo.lista();

  }

  direcionaLoginPage(item: any){
    this._serviceUsuario.van.ano = item.ano;
    this._serviceUsuario.van.fabricante = item.fabricante;
    this._serviceUsuario.van.modelo = item.modelo;
    this._serviceUsuario.van.placa = item.placa;
    this._serviceUsuario.van.quantidadePassageiros = item.quantidadePassageiros;
    this._serviceUsuario.van.renavam = item.renavam;

    this.navCtrl.setRoot(LoginPage);
  }

}
