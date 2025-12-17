import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { ShopKeeperDetail } from '../model/shop-keeper.model';
import { LoadingController } from '@ionic/angular';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { VendorDeatil } from 'src/app/app.const';
import { IonicModule } from '@ionic/angular';
import { ParseNumberPipe } from 'src/app/pipes/parse-number.pipe';
import {RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [IonicModule, ParseNumberPipe, RouterModule, CommonModule],
  selector: 'app-user-shops',
  templateUrl: './user-shops.page.html',
  styleUrls: ['./user-shops.page.scss'],
})
export class UserShopsPage implements OnInit {

  userShops: Array<ShopKeeperDetail> = [];
  user: ShopKeeperDetail;
  vendorDeatil: VendorDeatil;

  constructor(
    private appService: AppService,
    private router: Router,
    private loadingController: LoadingController,
    private utilAlertService: UtilAlertService
  ) {
    this.getUserDetail();
    this.getVendorDetail();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
      if (res) {
        this.userShops = this.user.shops;
      }
    });
  }

  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

  async addShop() {
    if (this.user) {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      const data = {
        name: '',
        description: '',
        phonenumber: this.user.phonenumber + '_new',
        idCategory: this.vendorDeatil.idCategory,
        password: '',
        type: 'S'
      };
      this.appService.signup(data).subscribe((res) => {
        if (res && res.body) {
          loading.dismiss();
          this.user.shops.push(res.body);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.appService.setUserDetail(this.user);
          this.router.navigate(['/shop-keeper', res.body.phonenumber]);
        }
      });
    } else {
      this.utilAlertService.showAlert('Internel server error! Please try after some time');
    }
  }

  addGuest() {
    this.router.navigate(['/guest']);
  }

  viewGuests() {
    this.router.navigate(['/guests-list']);
  }

  deleteShop(item) {
    const query = {
      query: item.userId
    };
    this.appService.deleteShop(query).subscribe((res) => {
      this.getUserDetail();
      const index = this.userShops.findIndex((val) => {
        return val.userId === res;
      });
      if (index !== -1 ) {
        this.userShops.splice(index, 1);
        this.user.shops = this.userShops;
        this.appService.setUserDetail(this.user);
      }
    });
  }

}
