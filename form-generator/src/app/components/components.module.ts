import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsComponent } from './forms/forms.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestLoadingComponent } from './request-loading/request-loading.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { CardPageRedirectComponent } from './card-page-redirect/card-page-redirect.component';

@NgModule({
  declarations: [
    RegisterComponent, 
    RequestLoadingComponent, 
    LoginComponent, 
    AdminMenuComponent,
    CardPageRedirectComponent,
    FormsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RegisterComponent,
    RequestLoadingComponent,
    LoginComponent,
    FormsComponent,
    AdminMenuComponent,
    CardPageRedirectComponent
  ],
  providers:[RequestLoadingComponent, AlertMessageComponent, AdminMenuComponent]
})
export class ComponentsModule { }
