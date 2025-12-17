import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopKeeperPage } from './shop-keeper.page';

const routes: Routes = [
  {
    path: '',
    component: ShopKeeperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopKeeperPageRoutingModule {}
