import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class PagesProvidersDatabaseProvider {

  constructor(private sqlite: SQLite) {
  }


  public getDB() {
    return this.sqlite.create({
      name: 'products.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Criando as tabelas
        this.createTables(db);
 
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS acessosmobile (id integer primary key AUTOINCREMENT NOT NULL, codigo TEXT, nome TEXT, cpf TEXT, tipousuario TEXT)']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  public insert(nome: string = "", cpf: string = "", tipousuario: string = "", codigo: string = "") {
    return this.getDB()
      .then((db: SQLiteObject) => {
        db.executeSql(`select count(id) as qtd from acessosmobile where codigo = ${codigo}`,{}).then((registros: any) =>{

      if (registros.rows.item(0).qtd == 0) {
        let sql = 'insert into acessosmobile (nome, cpf, tipousuario, codigo) values (?, ?, ?, ?)';
        let data = [nome, cpf, tipousuario, codigo];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
        }
         }) .catch((e) => console.error(e));
        });
  }

  public listaAcessosAnteriores(tipo: string = ""){
    this.getDB()
    .then((db: SQLiteObject) => {
      let sql = `SELECT * FROM acessosmobile where tipousuario = ${tipo}`;

      db.executeSql(sql, null)
        .then((data: any) => {
          if (data.rows.length > 0) {
            let acessos: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var acesso = data.rows.item(i);
              acessos.push(acesso);
            }
            return acessos;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}
