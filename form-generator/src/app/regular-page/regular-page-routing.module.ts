import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegularPagePage } from './regular-page.page';

const routes: Routes = [
  {
    path: '',
    component: RegularPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegularPagePageRoutingModule {}
