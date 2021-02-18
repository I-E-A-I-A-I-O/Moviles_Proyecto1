import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStatsPageRoutingModule } from './form-stats-routing.module';

import { FormStatsPage } from './form-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStatsPageRoutingModule
  ],
  declarations: [FormStatsPage]
})
export class FormStatsPageModule {}
