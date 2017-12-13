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
import { AgmCoreModule } from '@agm/core';
import { ClienteService } from '../pages/services/cliente.service';
import { PassageiroContratoService } from '../pages/services/passageiro-contrato.service';
import { PassageiroMensalidadeService } from '../pages/services/passageiro-mensalidade.service';
import { AcessoMobileService } from '../pages/services/acesso-mobile.service';
import { VeiculoService } from '../pages/services/veiculo.service';
import { RotaService } from '../pages/services/rota.service';
import { MotoristaService } from '../pages/services/motorista.service';
import { PassageiroService } from '../pages/services/passageiro.service';
import { CheckInService } from '../pages/services/checkin.service';
import { QRScanner } from '@ionic-native/qr-scanner';
import { SQLite } from '@ionic-native/sqlite';
import { UsuarioService } from '../pages/services/usuario.service';
import { SelecionaVeiculoPage } from '../pages/seleciona-veiculo/seleciona-veiculo';
import { NativeStorage } from '@ionic-native/native-storage';
import { ConteudoDocumentoPage } from '../pages/conteudo-documento/conteudo-documento';
import { ConteudoMensalidadePage } from '../pages/conteudo-mensalidade/conteudo-mensalidade';
import { DiarioHistoricoPage } from '../pages/diario-historico/diario-historico';
import { DiarioSelecionaPassageiroPage } from '../pages/diario-seleciona-passageiro/diario-seleciona-passageiro';
import { RotaPassageiroPage } from '../pages/rota-passageiro/rota-passageiro';
import { ItinerarioPage } from '../pages/itinerario/itinerario';
import { RotaPassageiroService } from '../pages/services/rota-passageiro.service';
import { ItinerarioMotoristaPage } from '../pages/itinerario-motorista/itinerario-motorista';
import { Device } from '@ionic-native/device';



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
    DiarioPage,
    SelecionaVeiculoPage,
    ConteudoDocumentoPage,
    ConteudoMensalidadePage,
    DiarioHistoricoPage,
    DiarioSelecionaPassageiroPage,
    RotaPassageiroPage,
    ItinerarioPage,
    ItinerarioMotoristaPage
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
    DiarioPage,
    SelecionaVeiculoPage,
    ConteudoDocumentoPage,
    ConteudoMensalidadePage,
    DiarioHistoricoPage,
    DiarioSelecionaPassageiroPage,
    RotaPassageiroPage,
    ItinerarioPage,
    ItinerarioMotoristaPage
  ],
  providers: [AngularFireDatabase, ClienteService,
     VeiculoService, MotoristaService, PassageiroService, 
    PassageiroContratoService, PassageiroMensalidadeService, AcessoMobileService, RotaService, CheckInService, UsuarioService,
    StatusBar,
    SplashScreen,
    QRScanner,
    SQLite,
    NativeStorage,
    RotaPassageiroService,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
