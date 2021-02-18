import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegularPagePageRoutingModule } from './regular-page-routing.module';

import { RegularPagePage } from './regular-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegularPagePageRoutingModule
  ],
  declarations: [RegularPagePage]
})
export class RegularPagePageModule {}
