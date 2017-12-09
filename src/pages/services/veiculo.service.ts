import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { Veiculo } from '../classes/Veiculo';

@Injectable()
export class VeiculoService {

  veiculo: Veiculo;
  key = "";

  constructor(public afDataBase: AngularFireDatabase) { 
  }

  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.key}/Veiculos/${key}`);
  }

  lista(): FirebaseListObservable<any>{

    return this.afDataBase.list(`/Clientes/${this.key}/Veiculos`,{
      query: {
      orderByChild: 'placa'
      }
      });
  }

  alterar(key: string, veiculo: Veiculo){

        return this.lista().update(key, veiculo);
  }

  novo(veiculo: Veiculo){
    debugger;
    return this.lista().push(veiculo);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {

      this.afDataBase.list(`/Clientes/${this.key}/Veiculos/`, {
        query: {
          orderByChild: 'placa',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Veículo já cadastrado.")); 
        }else{
          resolve();
        }
      });    
    });
  }
  

}
