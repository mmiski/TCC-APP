import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { Rota } from '../classes/Rota';
import { Usuario } from '../classes/Usuario';

@Injectable()
export class RotaService {

  rota: Rota;
  usuario: Usuario;
  key ="";


  constructor(public afDataBase: AngularFireDatabase) { 

  }

  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.key}/Rotas/${key}`);
  }

  lista(): FirebaseListObservable<any>{
    return this.afDataBase.list(`/Clientes/${this.key}/Rotas`,{
      query: {
      orderByChild: 'motoristaKeyTemp',
      equalTo: ""
      }
      })
  }
  
  listaIniciadas(): FirebaseListObservable<any>{
    return this.afDataBase.list(`/Clientes/${this.key}/Rotas`,{
      query: {
      orderByChild: 'iniciada',
      equalTo:true
      }
      })
  }

  alterar(key: string, rota: Rota){
        return this.lista().update(key, rota);
  }

  novo(rota: Rota){
    return this.lista().push(rota);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {

      this.afDataBase.list(`/Clientes/${this.key}/Rotas`).subscribe((dados) => {
        dados.forEach(element => {
            if (element.descricao == valor) {
                    reject(new Error("Rota já cadastrada."));                     
            }
        });  
        resolve();     
      });    
    });
  }

}
