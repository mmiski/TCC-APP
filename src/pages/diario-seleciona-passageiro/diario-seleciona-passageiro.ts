import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiarioHistoricoPage } from '../diario-historico/diario-historico';
import { UsuarioService } from '../services/usuario.service';
import { RotaPassageiroService } from '../services/rota-passageiro.service';
import { PassageiroService } from '../services/passageiro.service';

@IonicPage()
@Component({
  selector: 'page-diario-seleciona-passageiro',
  templateUrl: 'diario-seleciona-passageiro.html',
})
export class DiarioSelecionaPassageiroPage {

  rotaKey: string;
  listaPassageiros: Array<PassageiroDTO>;
  urlImagem = "https://image.flaticon.com/icons/png/512/201/201818.png";

  constructor(public navCtrl: NavController, public navParams: NavParams,public _serviceRotaPassageiro: RotaPassageiroService, public _servicePassageiro: PassageiroService,
    public _seriveUsuario: UsuarioService) {
    this.rotaKey = this.navParams.get('rotaKey');

    if (this.rotaKey) {
      this._serviceRotaPassageiro.clienteKey = _seriveUsuario.acesso.clienteKey;
      this._serviceRotaPassageiro.rotaKey = this.rotaKey; 
      this._servicePassageiro.key = _seriveUsuario.acesso.clienteKey;
      this.listaPassageiros = new Array<PassageiroDTO>();

      this._serviceRotaPassageiro.lista().subscribe(dados => {
        this.listaPassageiros = new Array<PassageiroDTO>();

        dados.forEach(element => {
          let pN = new PassageiroDTO();
          pN.$keyPassageiro = element.passageiroKey;       
          pN.$keyRotaPassageiro = element.$key;

          this._servicePassageiro.getDados(element.passageiroKey).subscribe(cnt => {
            if (cnt.length > 0) {
              cnt.forEach(pass => {
                if (pass.$key == 'cpf') {
                  pN.cpf = pass.$value; 
                }else if (pass.$key == 'nome') { 
                  pN.nome = pass.$value;  
                }                          
              });
              this.listaPassageiros.push(pN);
            }
          });

          
        });
      });
      }
  }

  diarioHistorico(){
    this.navCtrl.push(DiarioHistoricoPage);
  }

}
class PassageiroDTO{
  public $keyPassageiro: string = "";
  public $keyRotaPassageiro: string = "";
  public nome: string = "";
  public cpf: string = "";
}
