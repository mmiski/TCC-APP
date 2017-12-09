import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConteudoDocumentoPage } from './conteudo-documento';

@NgModule({
  declarations: [
    ConteudoDocumentoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConteudoDocumentoPage),
  ],
})
export class ConteudoDocumentoPageModule {}
