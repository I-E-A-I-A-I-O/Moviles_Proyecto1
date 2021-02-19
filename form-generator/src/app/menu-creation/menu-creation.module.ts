import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCreationPageRoutingModule } from './menu-creation-routing.module';

import { MenuCreationPage } from './menu-creation.page';
import { ComponentsModule } from '../components/components.module';
import { PassMenuDataService } from '../services/pass-menu-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCreationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuCreationPage],
  providers: [PassMenuDataService]
})
export class MenuCreationPageModule {}
