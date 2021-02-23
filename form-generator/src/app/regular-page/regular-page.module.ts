import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegularPagePageRoutingModule } from './regular-page-routing.module';

import { RegularPagePage } from './regular-page.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegularPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegularPagePage]
})
export class RegularPagePageModule {}
