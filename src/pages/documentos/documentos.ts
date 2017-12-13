import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConteudoDocumentoPage } from '../conteudo-documento/conteudo-documento';
import { ConteudoMensalidadePage } from '../conteudo-mensalidade/conteudo-mensalidade';
import { PassageiroContratoService } from '../services/passageiro-contrato.service';
import { ModeloContratoService } from '../services/modelo-contrato.service';
import { UsuarioService } from '../services/usuario.service';
import { AcessoMobile } from '../classes/AcessoMobile';
import { PassageiroMensalidadeService } from '../services/passageiro-mensalidade.service';
import { PlanoMensalidadeService } from '../services/plano-mensalidade.service';

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
  acesso: AcessoMobile;
  listaContratosAssinados: Array<ContratosDTO>;
  listaContratosPendentes: Array<ContratosDTO>;
  listaMensalidadesOk: Array<MensalidadeDTO>;
  listaMensalidadesPen: Array<MensalidadeDTO>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _serviceContrato: PassageiroContratoService,
              public _serviceModeloContrato: ModeloContratoService, public _serviceUsuario: UsuarioService,  public toastCtrl: ToastController,
              public _servicePassageiroMensalidade: PassageiroMensalidadeService, public _servicePlanoMensalidade: PlanoMensalidadeService) {

      this.acesso = this._serviceUsuario.acesso;
      this.listaContratosAssinados = new Array<ContratosDTO>();
      this.listaContratosPendentes = new Array<ContratosDTO>();
      this.listaMensalidadesOk = new Array<MensalidadeDTO>();
      this.listaMensalidadesPen = new Array<MensalidadeDTO>();

      this._serviceContrato.clienteKey = this.acesso.clienteKey;
      this._serviceModeloContrato.key = this.acesso.clienteKey;
      this._serviceContrato.passageiroKey = this.acesso.usuarioKey;
      this._servicePassageiroMensalidade.clienteKey = this.acesso.clienteKey;
      this._servicePlanoMensalidade.key = this.acesso.clienteKey;
      this._servicePassageiroMensalidade.passageiroKey = this.acesso.usuarioKey;


      //contratos     
      this._serviceContrato.lista().subscribe(dados => {
        this.listaContratosAssinados = new Array<ContratosDTO>();
        this.listaContratosPendentes = new Array<ContratosDTO>();
        dados.forEach(element => {
          let contratoN = new ContratosDTO();
          contratoN.assinado = element.assinado;
          contratoN.dataVencimento = element.dataVencimento;
          contratoN.contratoKey = element.contratoKey;
          contratoN.$key = element.$key;

          this._serviceModeloContrato.getDados(contratoN.contratoKey).subscribe(cnt => {
            if (cnt.length > 0) {
              contratoN.titulo = cnt[1].$value;
              contratoN.dados = cnt[0].$value;

              if (element.assinado) {
                this.listaContratosAssinados.push(contratoN);
              }else{
                this.listaContratosPendentes.push(contratoN);
              }

            }
          });
        });
      });

      //mensalidades
      this._servicePassageiroMensalidade.lista().subscribe(dados => {
        this.listaMensalidadesPen = new Array<MensalidadeDTO>();
        this.listaMensalidadesOk = new Array<MensalidadeDTO>();
        dados.forEach(element => {
          let mensalidadeN = new MensalidadeDTO();
          mensalidadeN.mensalidadeKey = element.mensalidadeKey;
          mensalidadeN.diaMaxPagamento = element.diaMaxPagamento;
          
          mensalidadeN.$key = element.$key;

          this._servicePlanoMensalidade.getDados(mensalidadeN.mensalidadeKey).subscribe(cnt => {
            if (cnt.length > 0) {
              mensalidadeN.titulo = cnt[1].$value;                  
              mensalidadeN.valor = cnt[2].$value;


              if (!element.janeiro || !element.fevereiro || !element.marco || !element.abril || !element.maio || !element.junho
                  || !element.julho || !element.agosto || !element.setembro || !element.outubro || !element.novembro || !element.dezembro) {
                    this.listaMensalidadesPen.push(mensalidadeN);
              }else{
                this.listaMensalidadesOk.push(mensalidadeN);
              }

              
            }
          });

          
        });
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentosPage');
  }

  assinar(assinado: boolean = false, key:string = ""){
    this._serviceContrato.assinar(assinado, key).then(() => {
      this.presentToast("Documento Assinado!");
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

  conteudoDoc(contratoKey: any){
    this.navCtrl.push(ConteudoDocumentoPage, {contratoKey: contratoKey});
  }

  conteudoMen(mensalidadeKey: any, pasMen: any){
    this.navCtrl.push(ConteudoMensalidadePage, {mensalidadeKey: mensalidadeKey, pasMen: pasMen});
  }
}

class ContratosDTO{
  public titulo: string = "";
  public dados: string = "";
  public contratoKey: string = "";
  public dataVencimento: string ="";
  public assinado: boolean = false;
  public $key: string= "";
}

class MensalidadeDTO{
  public $key: string = "";
  public mensalidadeKey: string = "";
  public titulo: string = "";
  public valor: string = "";
  public diaMaxPagamento: string = "";
}