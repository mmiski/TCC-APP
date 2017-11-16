import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CheckinPage } from '../pages/checkin/checkin';
import { TipoUsuarioPage } from '../pages/tipo-usuario/tipo-usuario';
import { HomeMotoristaPage } from '../pages/home-motorista/home-motorista';
import { HomePassageiroResponsavelPage } from '../pages/home-passageiro-responsavel/home-passageiro-responsavel';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CheckinPage,
    TipoUsuarioPage,
    HomeMotoristaPage,
    HomePassageiroResponsavelPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CheckinPage,
    TipoUsuarioPage,
    HomeMotoristaPage,
    HomePassageiroResponsavelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
