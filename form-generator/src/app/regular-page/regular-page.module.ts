import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegularPagePageRoutingModule } from './regular-page-routing.module';

import { RegularPagePage } from './regular-page.page';
import { ComponentsModule } from '../components/components.module';
import { UserStatsDisplayComponent } from '../components/user-stats-display/user-stats-display.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegularPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegularPagePage],
  providers: [
    UserStatsDisplayComponent
  ]
})
export class RegularPagePageModule {}
