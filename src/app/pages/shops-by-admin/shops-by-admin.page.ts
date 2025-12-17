import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorDeatil } from 'src/app/app.const';
import { ShopKeeperDetail } from '../model/shop-keeper.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-by-admin',
  templateUrl: './shops-by-admin.page.html',
  styleUrls: ['./shops-by-admin.page.scss'],
})
export class ShopsByAdminPage implements OnInit {

  storesList = [];
  vendorDeatil: VendorDeatil;
  user: ShopKeeperDetail;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {
    this.getUserDetail();
    this.getVendorDetail();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.data.subscribe((data) => {
      if (data && data.stores) {
        this.storesList = data.stores.body;
      }
    });
  }

  onStoreDetailClick(store) {
    if (store && store.loginId) {
      this.router.navigate(['/stores', store.loginId]);
    }
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
    });
  }

  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

}
