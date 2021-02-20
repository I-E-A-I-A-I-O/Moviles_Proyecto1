import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestLoadingComponent } from './request-loading/request-loading.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { CardPageRedirectComponent } from './card-page-redirect/card-page-redirect.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { FabComponent } from './fab/fab.component';
import { PassMenuDataService } from '../services/pass-menu-data.service';
import { ToastComponent } from './toast/toast.component';
import { MenuPreviewComponent } from './menu-preview/menu-preview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegisterComponent, 
    RequestLoadingComponent, 
    LoginComponent, 
    AdminMenuComponent,
    CardPageRedirectComponent,
    UserAvatarComponent,
    FabComponent,
    ToastComponent,
    MenuPreviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    RegisterComponent,
    RequestLoadingComponent,
    LoginComponent,
    AdminMenuComponent,
    CardPageRedirectComponent,
    UserAvatarComponent,
    FabComponent,
    ToastComponent,
    MenuPreviewComponent
  ],
  providers:[
    RequestLoadingComponent, 
    AlertMessageComponent, 
    AdminMenuComponent, 
    PassMenuDataService,
    ToastComponent
  ]
})
export class ComponentsModule { }
