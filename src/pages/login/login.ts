import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePassageiroResponsavelPage } from '../home-passageiro-responsavel/home-passageiro-responsavel';
import { HomeMotoristaPage } from '../home-motorista/home-motorista';
import { AcessoMobile } from '../classes/AcessoMobile';
import { ResponsavelService } from '../services/responsavel.service';
import { PassageiroService } from '../services/passageiro.service';
import { MotoristaService } from '../services/motorista.service';
import { AuthService } from '../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  tipoUsuario: number;
  urlImagem: string;
  acessoMobile: AcessoMobile;
  usuario: UsuarioDTO;

  constructor(public _serviceAuth: AuthService, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public _serviceResponsavel: ResponsavelService,
    public _servicePassageiro: PassageiroService, public _serviceMotorista: MotoristaService ) {
      let loader = this.loadingCtrl.create({
        content: "Carregando Dados..."
      });
      loader.present();
    this.acessoMobile = new AcessoMobile();
    this.usuario = new UsuarioDTO();
    this.tipoUsuario = this.navParams.get('tipoUsuario');
    this.acessoMobile = this.navParams.get('acesso');

    this.usuario.tipoUsuario = this.tipoUsuario;
    this._serviceMotorista.key = this.acessoMobile .clienteKey;
    this._servicePassageiro.key = this.acessoMobile .clienteKey;
    this._serviceResponsavel.key = this.acessoMobile .clienteKey;

    this.urlImagem = this.tipoUsuario == 1 ? "http://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Bus-icon.png" :
                    this.tipoUsuario == 2 ? "https://image.flaticon.com/icons/png/512/201/201818.png" : "https://icon-icons.com/icons2/564/PNG/512/Family_icon-icons.com_54182.png";

                    if (this.acessoMobile.tipoUsuario == 0) {
                      this._servicePassageiro.getDados(this.acessoMobile.usuarioKey).subscribe(pass => {
                        pass.forEach(element => {
                          debugger;
                          if (element.$key == 'nome') {
                            this.usuario.nome = element.$value; 
                          }
                          if (element.$key == 'cpf') {
                            this.usuario.cpf = element.$value; 
                          }
                          if (element.$key == '$key') {
                            this.usuario.$key = element.$value; 
                          }
                        });      
                      });
                    } else if (this.acessoMobile.tipoUsuario == 1) {
                      this._serviceMotorista.getDados(this.acessoMobile.usuarioKey).subscribe(pass => {
                        pass.forEach(element => {
                          if (element.$key == 'nome') {
                            this.usuario.nome = element.$value; 
                          }
                          if (element.$key == 'cpf') {
                            this.usuario.cpf = element.$value; 
                          }if (element.$key == '$key') {
                            this.usuario.$key = element.$value; 
                          }
                        });                
                      });
                    }else if (this.acessoMobile.tipoUsuario == 2) {
                      this._serviceResponsavel.getDados(this.acessoMobile.usuarioKey).subscribe(pass => {
                        pass.forEach(element => {
                          if (element.$key == 'nome') {
                            this.usuario.nome = element.$value; 
                          }
                          if (element.$key == 'cpf') {
                            this.usuario.cpf = element.$value; 
                          }if (element.$key == '$key') {
                            this.usuario.$key = element.$value; 
                          }
                        });                
                      });
                    }
                    this._serviceAuth.usuario = this.usuario;
                    loader.dismiss();   
                    
                    setTimeout(()=>{ 
                      this.navCtrl.setRoot(this.tipoUsuario == 1 ? HomeMotoristaPage: HomePassageiroResponsavelPage,  {usuario: this.usuario} );
                     }, 2000)  ;  
  }

  



}
class UsuarioDTO{
  public nome: string = "";
  public cpf: string = "";
  public tipoUsuario: number;
  public $key: string = "";
}