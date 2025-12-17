import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import moment from 'moment';
import { StoresPage } from './stores.page';
import { AppService } from 'src/app/services/app.service';


@Injectable({
  providedIn: 'root'
})
export class StoreDetailResolver implements Resolve<any> {
  constructor(private appService: AppService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const query = {
      loginId: route.paramMap.get('id'),
      date: moment().format('DD-MM-YYYY')
    };
    return this.appService.getStoreDetail(query);
  }
}


@Injectable({
  providedIn: 'root'
})
export class MultiDateStoreDetailResolver implements Resolve<any> {

  smallScreen = false;

  constructor(private appService: AppService) {
    this.smallScreen = this.appService.checkSmallScreen();
  }
  resolve(route: ActivatedRouteSnapshot) {
    const numberOfdays = this.smallScreen ? 3 : 7;
    const queryArr = [];
    const today = new Date();
    for (let i = 0; i < numberOfdays; i++) {
      const newDate = moment(today).add(i, 'days');
      const query = {
        loginId: route.paramMap.get('id'),
        date: newDate.format('DD-MM-YYYY')
      };
      queryArr.push(query);
    }
    return this.appService.requestDataFromMultipleSources(queryArr);
  }
}

const routes: Routes = [
  {
    path: '',
    component: StoresPage,
    resolve: {
      storeDetail: StoreDetailResolver,
      multiDateStoreDetail: MultiDateStoreDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresPageRoutingModule {}