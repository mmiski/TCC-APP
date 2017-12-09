import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularFire2/database';
import { RotaService } from '../services/rota.service';
import { UsuarioService } from '../services/usuario.service';
import { ItinerarioMotoristaPage } from '../itinerario-motorista/itinerario-motorista';

/**
 * Generated class for the RotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rotas',
  templateUrl: 'rotas.html',
})
export class RotasPage {
  urlImagem="http://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Bus-icon.png";
  listaRotas: FirebaseListObservable<any>;
  listaRotasIniciadas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _serviceRota: RotaService, public _serviceUsuario: UsuarioService) {
    this._serviceRota.key = this._serviceUsuario.acesso.clienteKey;

    this.listaRotas = this._serviceRota.lista();
    this.listaRotasIniciadas = this._serviceRota.listaIniciadas();
  }

  itinerario(rota: any){
    this.navCtrl.push(ItinerarioMotoristaPage, {rotaKey: rota.$key});
  }

  iniciarRota(rota: any){
    this.navCtrl.push(ItinerarioMotoristaPage, {rotaKey: rota.$key});
  }

}
