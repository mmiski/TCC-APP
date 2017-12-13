import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularFire2/database';
import { RotaService } from '../services/rota.service';
import { UsuarioService } from '../services/usuario.service';
import { ItinerarioMotoristaPage } from '../itinerario-motorista/itinerario-motorista';
import { Rota } from '../classes/Rota';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public _serviceRota: RotaService,
             public _serviceUsuario: UsuarioService, public toastCtrl: ToastController) {
    this._serviceRota.key = this._serviceUsuario.acesso.clienteKey;

    this.listaRotas = this._serviceRota.lista();
    this.listaRotasIniciadas = this._serviceRota.listaIniciadas();
  }

  itinerario(rota: any){
    this.navCtrl.push(ItinerarioMotoristaPage, {rotaKey: rota.$key});
  }

  presentToast(msg: string = "OK") {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  iniciarRota(rota: any){
    let rA = new Rota();
    
    rA.descricao = rota.descricao;
    rA.horaInicio = rota.horaInicio;
    rA.horaTermino = rota.horaTermino;
    rA.iniciada = true;
    rA.motoristaKeyTemp = this._serviceUsuario.acesso.usuarioKey;

    this._serviceRota.alterar(rota.$key, rA).then(() => {
      this.presentToast("Rota Iniciada!");
      this.navCtrl.push(ItinerarioMotoristaPage, {rotaKey: rota.$key});
    }).catch(err =>{
      this.presentToast(err.message);
    })   
  }

  finalizarRota(rota: any){
    let rA = new Rota();
    
    rA.descricao = rota.descricao;
    rA.horaInicio = rota.horaInicio;
    rA.horaTermino = rota.horaTermino;
    rA.iniciada = false;
    rA.motoristaKeyTemp = "";

    this._serviceRota.alterar(rota.$key, rA).then(() => {
      this.presentToast("Rota Finalizada!");
      this.navCtrl.push(ItinerarioMotoristaPage, {rotaKey: rota.$key});
    }).catch(err =>{
      this.presentToast(err.message);
    })   
  }

}
