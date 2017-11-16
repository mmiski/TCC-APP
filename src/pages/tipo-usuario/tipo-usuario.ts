import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckinPage } from '../checkin/checkin';

/**
 * Generated class for the TipoUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tipo-usuario',
  templateUrl: 'tipo-usuario.html',
})
export class TipoUsuarioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  seleciona(tipo: number){
    this.navCtrl.push(CheckinPage, {tipoUsuario: tipo});
  }

}
