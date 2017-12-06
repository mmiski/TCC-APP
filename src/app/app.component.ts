import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TipoUsuarioPage } from '../pages/tipo-usuario/tipo-usuario';
import { LoginPage } from '../pages/login/login';
import { PagesProvidersDatabaseProvider } from '../providers/pages-providers-database/pages-providers-database';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TipoUsuarioPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, database: PagesProvidersDatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      database.createDatabase()
      .then(() => {
        // fechando a SplashScreen somente quando o banco for criado
        splashScreen.hide();
      })
      .catch(() => {
        // ou se houver erro na criação do banco
        splashScreen.hide();
      });
    });
  }
  @ViewChild(Nav) public nav: Nav;
  gotologin(){
    this.nav.setRoot(LoginPage)
  }
}

