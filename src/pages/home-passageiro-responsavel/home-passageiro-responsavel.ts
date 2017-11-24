import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { DiarioPage } from '../diario/diario';
import { RotasPage } from '../rotas/rotas';
import { DocumentosPage } from '../documentos/documentos';

/**
 * Generated class for the HomePassageiroResponsavelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-passageiro-responsavel',
  templateUrl: 'home-passageiro-responsavel.html',
})
export class HomePassageiroResponsavelPage {
  tab1 = RotasPage;
  tab2 = DiarioPage;
  tab3 = DocumentosPage;
  tab4 = PerfilPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePassageiroResponsavelPage');
  }

}
