import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPagePageRoutingModule } from './admin-page-routing.module';

import { AdminPagePage } from './admin-page.page';
import { ComponentsModule } from '../components/components.module';
import { VerifySessionService } from '../services/verify-session.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminPagePage],
  providers: [VerifySessionService]
})
export class AdminPagePageModule {}
