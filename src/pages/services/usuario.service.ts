import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularFire2/database';
import { UsuarioApp } from '../classes/UsuarioApp';
import { Cliente } from '../classes/Cliente';
import { AcessoMobile } from '../classes/AcessoMobile';
import { Veiculo } from '../classes/Veiculo';
import { PassageiroService } from './passageiro.service';
import { MotoristaService } from './motorista.service';
import { ClienteService } from './cliente.service';
import { Passageiro } from '../classes/Passageiro';
import { Motorista } from '../classes/Motorista';
import { AcessoMobileService } from './acesso-mobile.service';
import { Device } from '@ionic-native/device';
import { AcessoMobileApp } from '../classes/AcessoMobileApp';

@Injectable()
export class UsuarioService {

  usuario: UsuarioApp;
  cliente: Cliente;
  acesso: AcessoMobileApp;
  van: Veiculo;
  passageiro: Passageiro;
  motorista: Motorista;


  constructor(public afDataBase: AngularFireDatabase, public _servicePassageiro: PassageiroService, public _serviceMotorista: MotoristaService,
              public _serviceCliente: ClienteService, public _serviceAcesso: AcessoMobileService,private device: Device) { 
    this.usuario = new UsuarioApp();
    this.cliente = new Cliente();
    this.acesso = new AcessoMobileApp();
    this.van = new Veiculo();  
    this.passageiro = new Passageiro();
    this.motorista = new Motorista();

  }

  instanciaPassageiro(){

  }

  instanciaMotorista(){


  }

  instanciaCliente(){
    this._serviceCliente.lstClienteDataBase(this.acesso.clienteKey).subscribe((dados) => {
        dados.forEach(element => {
            if (element.$key == 'cnpjCpf') {
                this.cliente.cnpjCpf = element.$value; 
            }
            else if (element.$key == 'email') {
                this.cliente.email = element.$value; 
            }
            else if (element.$key == 'razaoSocial') {
                this.cliente.razaoSocial = element.$value; 
            }
            else if (element.$key == 'nome') {
                this.cliente.nome = element.$value; 
            }
            else if (element.$key == 'nomeFantasia') {
                this.cliente.nomeFantasia = element.$value; 
            }
            else if (element.$key == 'telefone') {
                this.cliente.telefone = element.$value; 
            }
        });  
    });
  }

  instanciaUsuario(){
    return new Promise((resolve, reject) => {
      debugger;
      this.usuario.tipoUsuario = this.acesso.tipoUsuario;
      this.usuario.$key = this.acesso.usuarioKey;
        if (this.acesso.tipoUsuario == 0) {
            this._servicePassageiro.key = this.acesso.clienteKey;
          this._servicePassageiro.getDados(this.acesso.usuarioKey).subscribe(dados => {
              dados.forEach(pass => {
                  debugger;
                if (pass.$key == 'cpf') {
                  this.usuario.cpf = pass.$value; 
                }
                else if (pass.$key == 'dataNascimento') {
                  this.usuario.dataNascimento = pass.$value; 
                }
                else if (pass.$key == 'nome') {
                  this.usuario.nome = pass.$value; 
                }
                else if (pass.$key == 'telefone') {
                  this.usuario.telefone = pass.$value; 
                }
                else if (pass.$key == 'email') {
                  this.usuario.email = pass.$value; 
                } 
                else if (pass.$key == 'descricaoPosicao') {
                  this.passageiro.descricaoPosicao = pass.$value; 
                }
                else if (pass.$key == 'endereco') {
                  this.passageiro.endereco = pass.$value; 
                }
                else if (pass.$key == 'latitude') {
                  this.passageiro.latitude = pass.$value; 
                }
                else if (pass.$key == 'longitude') {
                  this.passageiro.longitude = pass.$value; 
                }
              });
              resolve();
            });
        }else if (this.acesso.tipoUsuario == 1) {
            this._serviceMotorista.key = this.acesso.clienteKey;
          this._serviceMotorista.getDados(this.acesso.usuarioKey).subscribe(dados => {
              dados.forEach(pass => {
                if (pass.$key == 'cpf') {
                  this.usuario.cpf = pass.$value; 
                }
                else if (pass.$key == 'dataNascimento') {
                  this.usuario.dataNascimento = pass.$value; 
                }
                else if (pass.$key == 'nome') {
                  this.usuario.nome = pass.$value; 
                }
                else if (pass.$key == 'telefone') {
                  this.usuario.telefone = pass.$value; 
                }
                else if (pass.$key == 'dataEmissao') {
                  this.motorista.dataEmissao = pass.$value; 
                }
                else if (pass.$key == 'dataVencimento') {
                  this.motorista.dataVencimento = pass.$value; 
                }
                else if (pass.$key == 'nRegistro') {
                  this.motorista.nRegistro = pass.$value; 
                }
              });
              resolve();
            });
        }

    });
     
  }

  atualizaAcesso(){
    debugger;
    this._serviceAcesso.clienteKey = this.acesso.clienteKey;

    let an = new AcessoMobile();
    an.clienteKey = this.acesso.clienteKey;
    an.codigo = this.acesso.codigo;
    an.tipoUsuario = this.acesso.tipoUsuario;
    an.usuarioKey = this.acesso.usuarioKey;
    let dateNow : Date = new Date();

    an.ultimoAcesso = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
    an.dispositivoUltimoAcesso = this.device.model;

    this._serviceAcesso.lista().update(this.acesso.$key, an);
  }

}
