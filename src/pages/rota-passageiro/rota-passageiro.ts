import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItinerarioPage } from '../itinerario/itinerario';
import { FirebaseListObservable } from 'angularFire2/database';
import { RotaService } from '../services/rota.service';
import { UsuarioService } from '../services/usuario.service';

/**
 * Generated class for the RotaPassageiroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rota-passageiro',
  templateUrl: 'rota-passageiro.html',
})
export class RotaPassageiroPage {

  urlImagem="http://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Bus-icon.png";
  listaRotas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _serviceRota: RotaService, public _serviceUsuario: UsuarioService) {
    this._serviceRota.key = this._serviceUsuario.acesso.clienteKey;

    this.listaRotas = this._serviceRota.lista();
  }

  itinerario(rota: any){
    this.navCtrl.push(ItinerarioPage, {rotaKey: rota.$key});
  }

}
