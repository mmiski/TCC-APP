import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomeMotoristaPage } from '../home-motorista/home-motorista';
import { HomePassageiroPage } from '../home-passageiro/home-passageiro';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  chave: string = "";
  tipoUsuario: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.tipoUsuario = this.navParams.get('tipoUsuario');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Validando...",
      duration: 2000
    });
    loader.present();
    this.navCtrl.setRoot(this.tipoUsuario == 1 ? HomeMotoristaPage : HomePassageiroPage)
  }



}
