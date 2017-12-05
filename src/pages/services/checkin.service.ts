import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularFire2/database";
import { Injectable } from '@angular/core';
import { Provider } from '@angular/core/src/di/provider';
import { AcessoMobile } from '../classes/AcessoMobile';

@Injectable()
export class CheckInService{

    acessoMobile: AcessoMobile;

    constructor(public afDataBase: AngularFireDatabase){
        this.acessoMobile = new AcessoMobile();
    }


    verificaCodigo(guid: string = "", tipo: string = ""){
        return new Promise((resolve, reject) => {
            this.afDataBase.list(`/AcessosMobile/`, {
              query: {
                orderByChild: 'codigo',
                equalTo: guid
              }
            }).subscribe((dados) => {
                
            dados.forEach(acesso => {
                if (acesso.tipoUsuario != tipo) {
                 reject(new Error("Esse código não é valido!"));
                }else{
                    this.acessoMobile.clienteKey = acesso.clienteKey;
                    this.acessoMobile.codigo = acesso.codigo;
                    this.acessoMobile.dispositivoUltimoAcesso = acesso.dispositivoUltimoAcesso;
                    this.acessoMobile.tipoUsuario = acesso.tipoUsuario;
                    this.acessoMobile.ultimoAcesso = acesso.ultimoAcesso;
                    this.acessoMobile.usuarioKey = acesso.usuarioKey;

                    resolve(this.acessoMobile);
                }
            });
            
            if (dados.length == 0){               
                reject(new Error("Código não encontrado!"));
              }
            });    
          });
    }


}