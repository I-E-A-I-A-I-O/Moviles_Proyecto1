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
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { FabComponent } from './fab/fab.component';
import { ToastComponent } from './toast/toast.component';
import { MenuPreviewComponent } from './menu-preview/menu-preview.component';
import { RouterModule } from '@angular/router';
import { MenuCreationFunctionsService } from '../services/menu-creation-functions.service';
import { VerifySessionService } from '../services/verify-session.service';
import { UsernameComponent } from './username/username.component';
import { RegularMenuComponent } from './regular-menu/regular-menu.component';
import { MenuPreviewProductionComponent } from './menu-preview-production/menu-preview-production.component';
import { NewUsernameComponent } from './new-username/new-username.component';
import { NewEmailComponent } from './new-email/new-email.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NewGenderComponent } from './new-gender/new-gender.component';
import { NewAgeComponent } from './new-age/new-age.component';
import { NewAvatarComponent } from './new-avatar/new-avatar.component';
import { PopoverComponent } from './popover/popover.component';
import { PopoverComponentComponent } from './popover-component/popover-component.component';
@NgModule({
  declarations: [
    RegisterComponent, 
    RequestLoadingComponent, 
    LoginComponent, 
    AdminMenuComponent,
    CardPageRedirectComponent,
    FormsComponent,
    UserAvatarComponent,
    FabComponent,
    ToastComponent,
    MenuPreviewComponent,
    UsernameComponent,
    RegularMenuComponent,
    MenuPreviewProductionComponent,
    NewUsernameComponent,
    NewEmailComponent,
    NewPasswordComponent,
    NewGenderComponent,
    NewAgeComponent,
    NewAvatarComponent,
    PopoverComponent,
    PopoverComponentComponent
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
    FormsComponent,
    AdminMenuComponent,
    CardPageRedirectComponent,
    UserAvatarComponent,
    FabComponent,
    ToastComponent,
    MenuPreviewComponent,
    UsernameComponent,
    RegularMenuComponent,
    MenuPreviewProductionComponent,
    NewUsernameComponent,
    NewEmailComponent,
    NewPasswordComponent,
    NewGenderComponent,
    NewAgeComponent,
    NewAvatarComponent,
    PopoverComponent,
    PopoverComponentComponent
  ],
  providers:[
    RequestLoadingComponent, 
    AlertMessageComponent, 
    AdminMenuComponent,
    ToastComponent,
    MenuCreationFunctionsService,
    VerifySessionService,
    RegularMenuComponent,
    PopoverComponent
  ]
})
export class ComponentsModule { }
