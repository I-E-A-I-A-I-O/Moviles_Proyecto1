import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCreationPage } from './menu-creation.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCreationPageRoutingModule {}
