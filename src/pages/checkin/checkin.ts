import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireDatabase,  FirebaseListObservable  } from 'angularFire2/database';
import * as firebase from 'firebase/app';
import { AcessoMobile } from '../classes/AcessoMobile';
@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {
  chave: string = "";
  tipoUsuario: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public afDataBase: AngularFireDatabase, private _alertCtrl: AlertController) {
    this.tipoUsuario = this.navParams.get('tipoUsuario');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Validando...",
    });
    loader.present();

    this.afDataBase.list(`/AcessosMobile/`,{
      query: {
      orderByChild: 'codigo',
      equalTo: this.chave
      }
      }).subscribe(dados => {
        debugger;
        if (dados.length == 0) {
          loader.dismiss();
          this._alertCtrl.create({
            title: 'Atenção',
            subTitle: 'Chave incorreta!',
            buttons: [{ text: 'Ok'}]
          }).present();
          
        }else{
          dados.forEach(element => {
            if (element.tipoUsuario != this.tipoUsuario) {
              debugger;
              loader.dismiss();
              this._alertCtrl.create({
                title: 'Atenção',
                subTitle: 'Chave incorreta!',
                buttons: [{ text: 'Ok'}]
              }).present();
            }else{
              loader.dismiss();
              let acessoMobile = new AcessoMobile();
              acessoMobile.clienteKey = element.clienteKey;
              acessoMobile.codigo = this.chave;
              acessoMobile.tipoUsuario = element.tipoUsuario;
              acessoMobile.usuarioKey = element.usuarioKey;

              this.navCtrl.setRoot(LoginPage, {tipoUsuario: this.tipoUsuario, acesso: acessoMobile});
            }
          });
        }
      });   
  }

}
