import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageFormsPageRoutingModule } from './page-forms-routing.module';
import { PageFormsPage } from './page-forms.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageFormsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PageFormsPage]
})
export class PageFormsPageModule {}
