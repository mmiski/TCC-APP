import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModeloContrato } from '../classes/ModeloContrato';
import { ModeloContratoService } from '../services/modelo-contrato.service';


@IonicPage()
@Component({
  selector: 'page-conteudo-documento',
  templateUrl: 'conteudo-documento.html',
})
export class ConteudoDocumentoPage {
documento: ModeloContrato;
key: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _serviceModeloContrato: ModeloContratoService) {
    this.documento = new ModeloContrato();
    this.key = this.navParams.get('contratoKey');


    this._serviceModeloContrato.getDados(this.key).subscribe(dados => {
      this.documento.titulo = dados[1].$value;
      this.documento.dados = dados[0].$value;
    });

  }


}
