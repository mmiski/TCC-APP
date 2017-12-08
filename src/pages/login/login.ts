import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePassageiroResponsavelPage } from '../home-passageiro-responsavel/home-passageiro-responsavel';
import { HomeMotoristaPage } from '../home-motorista/home-motorista';
import { AcessoMobile } from '../classes/AcessoMobile';
import { UsuarioApp } from '../classes/UsuarioApp';
import { Veiculo } from '../classes/Veiculo';
import { UsuarioService } from '../services/usuario.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  urlImagem: string;
  acessoMobile: AcessoMobile;
  usuario: UsuarioApp;
  van: Veiculo;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public _serviceUsuario: UsuarioService) {
      this.usuario = new UsuarioApp();
      this.van = new Veiculo();
      this.acessoMobile = new AcessoMobile();

    let loader = this.loadingCtrl.create({
        content: "Carregando Dados..."
      });
      loader.present();

      this._serviceUsuario.instanciaUsuario().then(() => {
        debugger;
        this.acessoMobile = this._serviceUsuario.acesso;    
        this.usuario = this._serviceUsuario.usuario;
        this.van = this._serviceUsuario.van;
    
        this.urlImagem = this.acessoMobile.tipoUsuario == 1 ? "http://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Bus-icon.png" :
                        this.acessoMobile.tipoUsuario == 0 ? "https://image.flaticon.com/icons/png/512/201/201818.png" : "https://image.flaticon.com/icons/png/512/201/201818.png";
                                              
        loader.dismiss();          
        setTimeout(()=>{ 
          this.navCtrl.setRoot(this.acessoMobile.tipoUsuario == 1 ? HomeMotoristaPage: HomePassageiroResponsavelPage);
          }, 3000)  ;  
      }); 
   
  }
}
