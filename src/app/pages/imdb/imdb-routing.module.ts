import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImdbPage } from './imdb.page';

const routes: Routes = [
  {
    path: '',
    component: ImdbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImdbPageRoutingModule {}
