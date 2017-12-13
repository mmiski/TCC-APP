import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { CheckInService } from '../services/checkin.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { PassageiroService } from '../services/passageiro.service';
import { MotoristaService } from '../services/motorista.service';
import { LoginPage } from '../login/login';
import { SelecionaVeiculoPage } from '../seleciona-veiculo/seleciona-veiculo';
import { UsuarioService } from '../services/usuario.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { AcessoMobileApp } from '../classes/AcessoMobileApp';

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {
  codigo: string = "";
  tipoUsuario: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
              private _alertCtrl: AlertController, public _serviceCheckin: CheckInService, public qrScanner: QRScanner,
              public _servicePassageiro: PassageiroService, public _serviceMotorista: MotoristaService, public platform: Platform, 
              public _serviceUsuario: UsuarioService, private nativeStorage: NativeStorage) {
    this.tipoUsuario = this.navParams.get('tipoUsuario');

    if (this.platform.is('cordova')) {
      this.nativeStorage.getItem('codigo')
      .then(ultimoCodigo => {
        this.codigo = ultimoCodigo;
      });
    }
   
  }

  lerQrcode(){

    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
       if (status.authorized) {
         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
           this.codigo = text;
  
           this.qrScanner.hide(); // hide camera preview
           scanSub.unsubscribe(); // stop scanning
         });
  
         // show camera preview
         this.qrScanner.show();

  
       }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  acessar() {
    let loader = this.loadingCtrl.create({
      content: "Validando...",
    });
    loader.present();

    this._serviceCheckin.verificaCodigo(this.codigo, this.tipoUsuario).then((acessoDados: AcessoMobileApp) => {
  
        this._serviceUsuario.acesso = acessoDados;
        this._serviceUsuario.instanciaCliente();
       
        if (this.platform.is('cordova')) {
          this.nativeStorage.setItem('codigo', this.codigo)
          .then(
            () => {
              this._serviceUsuario.atualizaAcesso();
              if (this.tipoUsuario == '1') {
                this._serviceUsuario.instanciaMotorista();
                loader.dismiss();
                this.navCtrl.push(SelecionaVeiculoPage);
              }else{
                this._serviceUsuario.instanciaPassageiro();
                loader.dismiss();
              this.navCtrl.setRoot(LoginPage);
              }
            },
            error => console.error('Error storing item', error)
          );
        }else{
          this._serviceUsuario.atualizaAcesso();
          if (this.tipoUsuario == '1') {
            this._serviceUsuario.instanciaMotorista();
            loader.dismiss();
            this.navCtrl.push(SelecionaVeiculoPage);
          }else{
            this._serviceUsuario.instanciaPassageiro();
            loader.dismiss();
          this.navCtrl.setRoot(LoginPage);
          }
        }
       
        
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
