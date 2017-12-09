import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { DiarioPage } from '../diario/diario';
import { DocumentosPage } from '../documentos/documentos';
import { RotaPassageiroPage } from '../rota-passageiro/rota-passageiro';

@IonicPage()
@Component({
  selector: 'page-home-passageiro-responsavel',
  templateUrl: 'home-passageiro-responsavel.html',
})
export class HomePassageiroResponsavelPage {
  tab1 = RotaPassageiroPage;
  tab2 = DiarioPage;
  tab3 = DocumentosPage;
  tab4 = PerfilPage;

  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    this.usuario = this.navParams.get('usuario');
  }
}
