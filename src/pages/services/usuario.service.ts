import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularFire2/database';
import { UsuarioApp } from '../classes/UsuarioApp';
import { Cliente } from '../classes/Cliente';
import { AcessoMobile } from '../classes/AcessoMobile';
import { Veiculo } from '../classes/Veiculo';
import { PassageiroService } from './passageiro.service';
import { MotoristaService } from './motorista.service';
import { ClienteService } from './cliente.service';

@Injectable()
export class UsuarioService {

  usuario: UsuarioApp;
  cliente: Cliente;
  acesso: AcessoMobile;
  van: Veiculo;


  constructor(public afDataBase: AngularFireDatabase, public _servicePassageiro: PassageiroService, public _serviceMotorista: MotoristaService,
              public _serviceCliente: ClienteService) { 
    this.usuario = new UsuarioApp();
    this.cliente = new Cliente();
    this.acesso = new AcessoMobile();
    this.van = new Veiculo();  

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
              });
              resolve();
            });
        }

    });
     
  }

}
