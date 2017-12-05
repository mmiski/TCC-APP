import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireDatabase,  FirebaseListObservable  } from 'angularFire2/database';
import * as firebase from 'firebase/app';
import { AcessoMobile } from '../classes/AcessoMobile';
import { CheckInService } from '../services/checkin.service';
@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {
  codigo: string = "";
  tipoUsuario: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
              private _alertCtrl: AlertController, public _serviceCheckin: CheckInService) {
    this.tipoUsuario = this.navParams.get('tipoUsuario');
  }

  acessar() {
    let loader = this.loadingCtrl.create({
      content: "Validando...",
    });
    loader.present();

    this._serviceCheckin.verificaCodigo(this.codigo, this.tipoUsuario).then((acessoDados: AcessoMobile) => {
        debugger;
        loader.dismiss();

        this.navCtrl.setRoot(LoginPage, {tipoUsuario: this.tipoUsuario, acesso: acessoDados});
      }).catch(err => {

        loader.dismiss();

        this._alertCtrl.create({       
          title: 'Atenção',
          subTitle: err,
          buttons: [{ text: 'Entendi'}]
        }).present();
      });   
  }

}
