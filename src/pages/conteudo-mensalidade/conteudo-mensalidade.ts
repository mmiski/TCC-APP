import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PassageiroMensalidadeService } from '../services/passageiro-mensalidade.service';
import { PlanoMensalidadeService } from '../services/plano-mensalidade.service';
import { PassageiroMensalidade } from '../classes/PassageiroMensalidade';

/**
 * Generated class for the ConteudoMensalidadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conteudo-mensalidade',
  templateUrl: 'conteudo-mensalidade.html',
})
export class ConteudoMensalidadePage {

  pasMen: string;
  mensalidadeKey: string;
  mensalidade: MensalidadeDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public _servicePassageiroMensalidade: PassageiroMensalidadeService,  public _servicePlanoMensalidade: PlanoMensalidadeService,
              public toastCtrl: ToastController) {

                this.pasMen = this.navParams.get('pasMen');
                this.mensalidadeKey = this.navParams.get('mensalidadeKey');
                this.mensalidade = new MensalidadeDTO();

                this._servicePassageiroMensalidade.getDados(this.pasMen).subscribe(dados => {
                  this.mensalidade.$key = this.pasMen;
                  this.mensalidade.mensalidadeKey = this.mensalidadeKey;
                  dados.forEach(pass => {
                    if (pass.$key == 'titulo') {
                      this.mensalidade.titulo = pass.$value; 
                    }
                    else if (pass.$key == 'dados') {
                      this.mensalidade.dados = pass.$value; 
                    }
                    else if (pass.$key == 'dataVencimento') {
                      this.mensalidade.dataVencimento = pass.$value; 
                    }
                    else if (pass.$key == 'diaMaxPagamento') {
                      this.mensalidade.diaMaxPagamento = pass.$value; 
                    }
                    else if (pass.$key == 'janeiro') {
                      this.mensalidade.janeiro = pass.$value; 
                    }
                    else if (pass.$key == 'fevereiro') {
                      this.mensalidade.fevereiro = pass.$value; 
                    }
                    else if (pass.$key == 'marco') {
                      this.mensalidade.marco = pass.$value; 
                    }
                    else if (pass.$key == 'abril') {
                      this.mensalidade.abril = pass.$value; 
                    } 
                    else if (pass.$key == 'maio') {
                      this.mensalidade.maio = pass.$value; 
                    }
                    else if (pass.$key == 'junho') {
                      this.mensalidade.junho = pass.$value; 
                    }
                    else if (pass.$key == 'julho') {
                      this.mensalidade.julho = pass.$value; 
                    }
                    else if (pass.$key == 'agosto') {
                      this.mensalidade.agosto = pass.$value; 
                    }
                    else if (pass.$key == 'setembro') {
                      this.mensalidade.setembro = pass.$value; 
                    }
                    else if (pass.$key == 'outubro') {
                      this.mensalidade.outubro = pass.$value; 
                    }
                    else if (pass.$key == 'novembro') {
                      this.mensalidade.novembro = pass.$value; 
                    }
                    else if (pass.$key == 'dezembro') {
                      this.mensalidade.dezembro = pass.$value; 
                    }

                      this._servicePlanoMensalidade.getDados(this.mensalidade.mensalidadeKey).subscribe(cnt => {
                        if (cnt.length > 0) {
                          this.mensalidade.dados = cnt[0].$value;
                          this.mensalidade.titulo = cnt[1].$value;                  
                          this.mensalidade.valor = cnt[2].$value;
                        }
                      });
                  });

                })
        
  }

  marcar(){
    let mensalidadeN = new PassageiroMensalidade();

    mensalidadeN.mensalidadeKey = this.mensalidade.mensalidadeKey;
    mensalidadeN.dataVencimento = this.mensalidade.dataVencimento;
    mensalidadeN.diaMaxPagamento = this.mensalidade.diaMaxPagamento;
    mensalidadeN.janeiro = this.mensalidade.janeiro;
    mensalidadeN.fevereiro = this.mensalidade.fevereiro;
    mensalidadeN.marco = this.mensalidade.marco;
    mensalidadeN.abril = this.mensalidade.abril;
    mensalidadeN.maio = this.mensalidade.maio;
    mensalidadeN.junho = this.mensalidade.junho;
    mensalidadeN.julho = this.mensalidade.julho;
    mensalidadeN.agosto = this.mensalidade.agosto;
    mensalidadeN.setembro = this.mensalidade.setembro;
    mensalidadeN.outubro = this.mensalidade.outubro;
    mensalidadeN.novembro = this.mensalidade.novembro;
    mensalidadeN.dezembro = this.mensalidade.dezembro;
    

    this._servicePassageiroMensalidade.alterar(this.mensalidade.$key, mensalidadeN).then(() =>{
      this.presentToast("Alteração Salva!");
    }).catch(err => {
      this.presentToast(err.message);
    });
  }


  presentToast(msg: string = "OK") {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}

class MensalidadeDTO{
  public $key: string = "";
  public titulo: string = "";
  public valor: string = "";
  public dados: string = "";
  public mensalidadeKey: string = "";
  public dataVencimento: string ="";
  public diaMaxPagamento: string = "";
  public janeiro: boolean = false;
  public fevereiro: boolean = false;
  public marco: boolean = false;
  public abril: boolean = false;
  public maio: boolean = false;
  public junho: boolean = false;
  public julho: boolean = false;
  public agosto: boolean = false;
  public setembro: boolean = false;
  public outubro: boolean = false;
  public novembro: boolean = false;
  public dezembro: boolean = false;
}

