import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiarioHistoricoPage } from './diario-historico';

@NgModule({
  declarations: [
    DiarioHistoricoPage,
  ],
  imports: [
    IonicPageModule.forChild(DiarioHistoricoPage),
  ],
})
export class DiarioHistoricoPageModule {}
