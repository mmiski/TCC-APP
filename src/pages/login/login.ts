import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePassageiroResponsavelPage } from '../home-passageiro-responsavel/home-passageiro-responsavel';
import { HomeMotoristaPage } from '../home-motorista/home-motorista';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  tipoUsuario: number;
  urlImagem: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    this.tipoUsuario = this.navParams.get('tipoUsuario');

    this.urlImagem = this.tipoUsuario == 1 ? "http://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Bus-icon.png" :
                    this.tipoUsuario == 2 ? "https://image.flaticon.com/icons/png/512/201/201818.png" : "https://icon-icons.com/icons2/564/PNG/512/Family_icon-icons.com_54182.png";

    setTimeout(()=>{ 
      let loader = this.loadingCtrl.create({
        content: "Carregando Dados...",
        duration: 1000
      });
      loader.present();
      this.navCtrl.setRoot(this.tipoUsuario == 1 ? HomeMotoristaPage : HomePassageiroResponsavelPage);
     }, 2000)
  }

  



}
