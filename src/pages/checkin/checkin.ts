import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { AcessoMobile } from '../classes/AcessoMobile';
import { CheckInService } from '../services/checkin.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { PassageiroService } from '../services/passageiro.service';
import { MotoristaService } from '../services/motorista.service';
import { PagesProvidersDatabaseProvider } from '../../providers/pages-providers-database/pages-providers-database';
import { LoginPage } from '../login/login';
import { SelecionaVeiculoPage } from '../seleciona-veiculo/seleciona-veiculo';
import { UsuarioService } from '../services/usuario.service';

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {
  codigo: string = "";
  tipoUsuario: string;
  listaAcessos: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
              private _alertCtrl: AlertController, public _serviceCheckin: CheckInService, public qrScanner: QRScanner,
              public _servicePassageiro: PassageiroService, public _serviceMotorista: MotoristaService,
              public _serviceDatabase: PagesProvidersDatabaseProvider, public platform: Platform, public _serviceUsuario: UsuarioService) {
    this.tipoUsuario = this.navParams.get('tipoUsuario');
    this.listaAcessos = new Array();

    if (this.platform.is('cordova')) {
      this._serviceDatabase.listaAcessosAnteriores(this.tipoUsuario).then((dados: any[]) => {
        this.listaAcessos = dados;
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

    this._serviceCheckin.verificaCodigo(this.codigo, this.tipoUsuario).then((acessoDados: AcessoMobile) => {
  
        this._serviceUsuario.acesso = acessoDados;
        this._serviceUsuario.instanciaCliente();
       
        if (this.platform.is('cordova')) {
          this.insertBaseDados(acessoDados).then(() => {
            loader.dismiss();
            if (this.tipoUsuario == '1') {
              this.navCtrl.push(SelecionaVeiculoPage);
            }else{
            this.navCtrl.setRoot(LoginPage);
            }
          }).catch(() => {
            loader.dismiss();
          });
        }else{
          if (this.tipoUsuario == '1') {
            loader.dismiss();
            this.navCtrl.push(SelecionaVeiculoPage);
          }else{
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

  insertBaseDados(acessoDados: AcessoMobile){
    return new Promise((resolve, reject) => {
      let nome: string;
      let cpf: string;

      if (this.tipoUsuario == '0') {
        this._servicePassageiro.key = acessoDados.clienteKey;
  
        this._servicePassageiro.getDados(acessoDados.usuarioKey).subscribe(pass => {
          pass.forEach(element => {
            debugger;
            if (element.$key == 'nome') {
              nome = element.$value; 
            }
            if (element.$key == 'cpf') {
              cpf = element.$value; 
            }
          });      
        });
      } else if (this.tipoUsuario == '1'){
          this._serviceMotorista.key = acessoDados.clienteKey;
    
          this._serviceMotorista.getDados(acessoDados.usuarioKey).subscribe(pass => {
            pass.forEach(element => {
              debugger;
              if (element.$key == 'nome') {
                nome = element.$value; 
              }
              if (element.$key == 'cpf') {
                cpf = element.$value; 
              }
            });      
          });       
      }

      this._serviceDatabase.insert(nome, cpf, this.tipoUsuario, acessoDados.codigo).then(() =>{
        resolve();
      }).catch(() => {
        reject();
      });
            
    });
  }

}
