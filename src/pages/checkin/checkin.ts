import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {
  chave: string = "";
  tipoUsuario: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.tipoUsuario = this.navParams.get('tipoUsuario');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Validando...",
      duration: 500
    });
    loader.present();
    this.navCtrl.setRoot(LoginPage, {tipoUsuario: this.tipoUsuario});
  }

}
