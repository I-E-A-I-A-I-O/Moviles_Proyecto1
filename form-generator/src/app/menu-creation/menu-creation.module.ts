import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCreationPageRoutingModule } from './menu-creation-routing.module';

import { MenuCreationPage } from './menu-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCreationPageRoutingModule
  ],
  declarations: [MenuCreationPage]
})
export class MenuCreationPageModule {}
