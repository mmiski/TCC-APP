import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireDatabase,  FirebaseListObservable  } from 'angularFire2/database';
import * as firebase from 'firebase/app';
import { AcessoMobile } from '../classes/AcessoMobile';
import { CheckInService } from '../services/checkin.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { PassageiroService } from '../services/passageiro.service';
import { MotoristaService } from '../services/motorista.service';
import { ResponsavelService } from '../services/responsavel.service';
import { PagesProvidersDatabaseProvider } from '../../providers/pages-providers-database/pages-providers-database';

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
              public _servicePassageiro: PassageiroService, public _serviceMotorista: MotoristaService,public _serviceResponsavel: ResponsavelService,
              public _serviceDatabase: PagesProvidersDatabaseProvider) {
    this.tipoUsuario = this.navParams.get('tipoUsuario');
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
        debugger;
        
        this.insertBaseDados(acessoDados).then(() => {
          loader.dismiss();
          this.navCtrl.setRoot(LoginPage, {tipoUsuario: this.tipoUsuario, acesso: acessoDados});
        }).catch(() => {
          loader.dismiss();
        });
        
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
      }else if (this.tipoUsuario == '2'){
        this._serviceResponsavel.key = acessoDados.clienteKey;
  
        this._serviceResponsavel.getDados(acessoDados.usuarioKey).subscribe(pass => {
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
