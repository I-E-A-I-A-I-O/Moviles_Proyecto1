import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageFormsPage } from './page-forms.page';

const routes: Routes = [
  {
    path: '',
    component: PageFormsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageFormsPageRoutingModule {}
