import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConteudoDocumentoPage } from '../conteudo-documento/conteudo-documento';
import { ConteudoMensalidadePage } from '../conteudo-mensalidade/conteudo-mensalidade';

/**
 * Generated class for the DocumentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documentos',
  templateUrl: 'documentos.html',
})
export class DocumentosPage {

  first = "documentos";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentosPage');
  }

  conteudoDoc(){
    this.navCtrl.push(ConteudoDocumentoPage);
  }

  conteudoMen(){
    this.navCtrl.push(ConteudoMensalidadePage);
  }
}
