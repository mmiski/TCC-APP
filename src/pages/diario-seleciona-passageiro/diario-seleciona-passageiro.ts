import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiarioHistoricoPage } from '../diario-historico/diario-historico';

@IonicPage()
@Component({
  selector: 'page-diario-seleciona-passageiro',
  templateUrl: 'diario-seleciona-passageiro.html',
})
export class DiarioSelecionaPassageiroPage {

  urlImagem = "https://image.flaticon.com/icons/png/512/201/201818.png";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  diarioHistorico(){
    this.navCtrl.push(DiarioHistoricoPage);
  }

}
