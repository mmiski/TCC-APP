import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { PassageiroContrato } from '../classes/PassageiroContrato';
import { Usuario } from '../classes/Usuario';

@Injectable()
export class PassageiroContratoService {

  passageiroContrato: PassageiroContrato;
  usuario: Usuario;
  clienteKey = "";
  passageiroKey = "";

  constructor(public afDataBase: AngularFireDatabase) { 
  }

  lista(): FirebaseListObservable<any>{
      return this.afDataBase.list(`/Clientes/${this.clienteKey}/Passageiros/${this.passageiroKey}/Contratos`,{
        query: {
        orderByChild: 'titulo'
        }
        });
  }

  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.clienteKey}/Passageiros/${this.passageiroKey}/Contratos/${key}`);
  }

  novo(passageiroContrato: PassageiroContrato){
    return this.lista().push(passageiroContrato);
  }

  alterar(key: string, passageiroContrato: PassageiroContrato){
    
       return this.lista().update(key, passageiroContrato);
  }

  assinar(assinado: boolean = false, key: string = ""){
    return this.lista().update(key, {assinado: assinado});
  }

  deleta(key: string){
    debugger;
    return this.lista().remove(key);
  }

  isDuplicado(dataVencimento: string = "", contratoKey: string = "" ){
    return new Promise((resolve, reject) => {

      this.afDataBase.list(`/Clientes/${this.clienteKey}/Passageiros/${this.passageiroKey}/Contratos`).subscribe((dados) => {

        dados.forEach(element => {
          debugger;
          if (element.dataVencimento >= dataVencimento && element.contratoKey == contratoKey) {
            reject(new Error("Passageiro já contém esse Contrato vigente no mesmo período!")); 
          }else{
            resolve();
          }
        });
        if (dados.length == 0) {
          resolve();
        }
      });    
    });
  }
  

}
