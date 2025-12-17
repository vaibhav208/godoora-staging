import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopCategoryPage } from './shop-category.page';

const routes: Routes = [
  {
    path: '',
    component: ShopCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCategoryPageRoutingModule {}
