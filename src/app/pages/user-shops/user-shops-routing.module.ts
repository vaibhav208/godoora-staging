import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserShopsPage } from './user-shops.page';

const routes: Routes = [
  {
    path: '',
    component: UserShopsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserShopsPageRoutingModule {}
