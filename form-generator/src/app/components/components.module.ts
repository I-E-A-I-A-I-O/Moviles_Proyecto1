import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestLoadingComponent } from './request-loading/request-loading.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';

@NgModule({
  declarations: [RegisterComponent, RequestLoadingComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RegisterComponent,
    RequestLoadingComponent
  ],
  providers:[RequestLoadingComponent, AlertMessageComponent]
})
export class ComponentsModule { }
