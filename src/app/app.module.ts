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
import { PerfilPage } from '../pages/perfil/perfil';
import { DocumentosPage } from '../pages/documentos/documentos';
import { RotasPage } from '../pages/rotas/rotas';
import { DiarioPage } from '../pages/diario/diario';
import { AngularFireDatabase } from "angularFire2/database";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';
import { AuthService } from '../pages/services/auth.service';
import { UsuarioService } from '../pages/services/usuario.service';
import { ClienteService } from '../pages/services/cliente.service';
import { PassageiroContratoService } from '../pages/services/passageiro-contrato.service';
import { AreaAtuacaoService } from '../pages/services/area-atuacao.service';
import { ModeloContratoService } from '../pages/services/modelo-contrato.service';
import { PassageiroMensalidadeService } from '../pages/services/passageiro-mensalidade.service';
import { AcessoMobileService } from '../pages/services/acesso-mobile.service';
import { PlanoMensalidadeService } from '../pages/services/plano-mensalidade.service';
import { VeiculoService } from '../pages/services/veiculo.service';
import { RotaService } from '../pages/services/rota.service';
import { ContatoService } from '../pages/services/contato.service';
import { UsuarioMensagemService } from '../pages/services/usuario-mensagem.service';
import { MotoristaService } from '../pages/services/motorista.service';
import { PassageiroService } from '../pages/services/passageiro.service';
import { ResponsavelService } from '../pages/services/responsavel.service';



const  config = {
  apiKey: "AIzaSyAXt5Jj-1uUdU_hy-jLnttbZFdTTVadWsE",
  authDomain: "web-vannz.firebaseapp.com",
  databaseURL: "https://web-vannz.firebaseio.com",
  projectId: "web-vannz",
  storageBucket: "web-vannz.appspot.com",
  messagingSenderId: "1018773332855"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CheckinPage,
    TipoUsuarioPage,
    HomeMotoristaPage,
    HomePassageiroResponsavelPage,
    PerfilPage,
    DocumentosPage,
    RotasPage,
    DiarioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),  
    AngularFireModule.initializeApp(config),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvOdpKx_WqECI5MBuE3UaHE63t-Ik3a3A'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CheckinPage,
    TipoUsuarioPage,
    HomeMotoristaPage,
    HomePassageiroResponsavelPage,
    PerfilPage,
    DocumentosPage,
    RotasPage,
    DiarioPage
  ],
  providers: [AngularFireDatabase, AuthService, UsuarioService, ClienteService, ContatoService, UsuarioMensagemService,
    AreaAtuacaoService, ModeloContratoService, PlanoMensalidadeService, VeiculoService, MotoristaService, PassageiroService, ResponsavelService, 
    PassageiroContratoService, PassageiroMensalidadeService, AcessoMobileService, RotaService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
