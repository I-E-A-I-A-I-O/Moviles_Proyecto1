import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./admin-page/admin-page.module').then( m => m.AdminPagePageModule)
  },
  {
    path: 'regular-home',
    loadChildren: () => import('./regular-page/regular-page.module').then( m => m.RegularPagePageModule)
  },
  {
    path: 'menu/creation',
    loadChildren: () => import('./menu-creation/menu-creation.module').then( m => m.MenuCreationPageModule)
  },
  {
    path: 'forms/stats',
    loadChildren: () => import('./form-stats/form-stats.module').then( m => m.FormStatsPageModule)
  },
  {
    path: 'user/edit/:type',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
