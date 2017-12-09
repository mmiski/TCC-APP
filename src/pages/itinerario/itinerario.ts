import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotaPassageiroService } from '../services/rota-passageiro.service';
import { PassageiroService } from '../services/passageiro.service';
import { UsuarioService } from '../services/usuario.service';


@IonicPage()
@Component({
  selector: 'page-itinerario',
  templateUrl: 'itinerario.html',
})
export class ItinerarioPage {

  zoom: number = 14;
  rotaKey: string = "";
  listaRotaPassageiros: Array<RotaPassageiroDTO>;
  listaPassageiros: Array<PassageiroDTO>;
  urlImagem = "https://image.flaticon.com/icons/png/512/201/201818.png";

  constructor(public navCtrl: NavController, public navParams: NavParams,public _serviceRotaPassageiro: RotaPassageiroService, public _servicePassageiro: PassageiroService,
              public _seriveUsuario: UsuarioService) {

    this.rotaKey = this.navParams.get('rotaKey');

    if (this.rotaKey) {
      this._serviceRotaPassageiro.clienteKey = _seriveUsuario.acesso.clienteKey;
      this._serviceRotaPassageiro.rotaKey = this.rotaKey; 
      this._servicePassageiro.key = _seriveUsuario.acesso.clienteKey;
      this.listaRotaPassageiros = new Array<RotaPassageiroDTO>();

      this._serviceRotaPassageiro.lista().subscribe(dados => {
        this.listaRotaPassageiros = new Array<RotaPassageiroDTO>();
        this.listaPassageiros = new Array<PassageiroDTO>();

        dados.forEach(element => {
          let rpN = new RotaPassageiroDTO();
          let pN = new PassageiroDTO();
          rpN.ordem = element.ordem;

          pN.$keyPassageiro = element.passageiroKey;
          pN.ordem = element.ordem;
          pN.segunda = element.segunda;
          pN.terca = element.terca;
          pN.quarta = element.quarta;
          pN.quinta = element.quinta;
          pN.sexta = element.sexta;
          pN.sabado = element.sabado;
          pN.domingo = element.domingo;
          
          pN.$keyRotaPassageiro = element.$key;

          this._servicePassageiro.getDados(element.passageiroKey).subscribe(cnt => {
            if (cnt.length > 0) {
              cnt.forEach(pass => {
                if (pass.$key == 'cpf') {
                  rpN.cpf = pass.$value; 
                  pN.cpf = pass.$value; 
                }else if (pass.$key == 'nome') {
                  rpN.nome = pass.$value;  
                  pN.nome = pass.$value;  
                } else if (pass.$key == 'latitude') {
                  rpN.latitude = pass.$value; 
                }else if (pass.$key == 'longitude') {
                  rpN.longitude = pass.$value;  
                }else if (pass.$key == 'endereco') {
                  pN.endereco = pass.$value;  
                }                            
              });
                  
              this.listaRotaPassageiros.push(rpN);
              this.listaPassageiros.push(pN);
            }
          });

          
        });
      });
}
  }

}

class RotaPassageiroDTO{
  public longitude: string = "";
  public latitude: string = "";
  public ordem: number = 0;
  public nome: string = "";
  public cpf: string = "";
}

class PassageiroDTO{
  public $keyPassageiro: string = "";
  public $keyRotaPassageiro: string = "";
  public ordem: number = 0;
  public nome: string = "";
  public cpf: string = "";
  public endereco: string = "";
  public segunda: boolean = false;
  public terca: boolean = false;
  public quarta: boolean = false;
  public quinta: boolean = false;
  public sexta: boolean = false;
  public sabado: boolean = false;
  public domingo: boolean = false;
}