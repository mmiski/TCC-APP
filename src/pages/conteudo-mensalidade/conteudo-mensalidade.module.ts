import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConteudoMensalidadePage } from './conteudo-mensalidade';

@NgModule({
  declarations: [
    ConteudoMensalidadePage,
  ],
  imports: [
    IonicPageModule.forChild(ConteudoMensalidadePage),
  ],
})
export class ConteudoMensalidadePageModule {}
