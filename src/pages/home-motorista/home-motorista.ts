import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { DiarioPage } from '../diario/diario';
import { RotasPage } from '../rotas/rotas';
import { DocumentosPage } from '../documentos/documentos';

/**
 * Generated class for the HomeMotoristaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-motorista',
  templateUrl: 'home-motorista.html',
})
export class HomeMotoristaPage {

  tab1 = RotasPage;
  tab2 = DiarioPage;
  tab3 = DocumentosPage;
  tab4 = PerfilPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeMotoristaPage');
  }

}
