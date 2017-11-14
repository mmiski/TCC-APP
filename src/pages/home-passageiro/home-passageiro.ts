import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the HomePassageiroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-passageiro',
  templateUrl: 'home-passageiro.html',
})
export class HomePassageiroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePassageiroPage');
  }

}
