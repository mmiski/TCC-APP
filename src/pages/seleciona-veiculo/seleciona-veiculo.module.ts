import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecionaVeiculoPage } from './seleciona-veiculo';

@NgModule({
  declarations: [
    SelecionaVeiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecionaVeiculoPage),
  ],
})
export class SelecionaVeiculoPageModule {}
