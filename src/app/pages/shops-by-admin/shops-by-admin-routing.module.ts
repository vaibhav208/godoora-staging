import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';

import { ShopsByAdminPage } from './shops-by-admin.page';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class StoresByAdminResolver  {
  constructor(private appService: AppService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const adminId = route.paramMap.get('id');
    return this.appService.getStoresByAdminId({adminId});
  }
}

const routes: Routes = [
  {
    path: '',
    component: ShopsByAdminPage,
    resolve: {
      stores: StoresByAdminResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsByAdminPageRoutingModule {}
