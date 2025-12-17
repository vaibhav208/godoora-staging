import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ShopKeeperDetail } from '../model/shop-keeper.model';
import  moment from 'moment';
import { VendorDeatil } from 'src/app/app.const';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { Router } from '@angular/router';

export class Guest {
  constructor(
    public adminCreated?: boolean,
    public name?: boolean,
    public description?: boolean,
    public phonenumber?: number,
    public type?: string,
    public idCategory?: number
  ) {
    this.type = 'c';
    this.adminCreated = true;
  }
}

export class GuestDetail {
  constructor(
    public checkIn?: string,
    public checkOut?: string,
    public roomId?: number,
    public customerId?: number,
    public bookTime?: string,
    public voucherNo?: string,
    public additionalGuest?: string
  ) {
    this.checkIn = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.001+05:30');
    this.checkOut = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.001+05:30');
    this.bookTime = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.001+05:30');
  }
}

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {

  guest: Guest = new Guest();
  guestDetail: GuestDetail = new GuestDetail();
  enableGuestDetail = false;
  rooms = [];
  user: ShopKeeperDetail;
  vendorDeatil: VendorDeatil;

  constructor(
    private appService: AppService,
    private utilAlertService: UtilAlertService,
    private router: Router
  ) {
    this.getUserDetail();
    this.getVendorDetail();
    this.rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getRoomNumbers();
  }

  addGuest() {
    if (!this.guest.idCategory) {
      this.guest.idCategory  = this.vendorDeatil.idCategory;
    }
    this.appService.signup(this.guest).subscribe((res) => {
      if (res && res.body) {
        this.guestDetail.customerId = res.body.userId;
        this.enableGuestDetail = true;
        this.guest = new Guest();
      }
    });
  }

  getRoomNumbers() {
    const params = {
      categoryId: this.vendorDeatil.idCategory
    };
    this.appService.getRooms(params).subscribe((res) => {
      if (res) {
        this.rooms = res.body;
      }
    });
  }

  updateGuestDetail() {
    if (this.guestDetail.roomId) {
      this.guestDetail.checkIn = moment(new Date(this.guestDetail.checkIn)).format('YYYY-MM-DDTHH:mm:ss.001+05:30');
      this.guestDetail.checkOut = moment(new Date(this.guestDetail.checkOut)).format('YYYY-MM-DDTHH:mm:ss.001+05:30');
      this.guestDetail.bookTime = moment(new Date(this.guestDetail.bookTime)).format('YYYY-MM-DDTHH:mm:ss.001+05:30');
      this.appService.saveGuestDetail(this.guestDetail).subscribe((res) => {
        if (res) {
          this.router.navigate(['/guests-list']);
        }
      });
    } else {
      this.utilAlertService.showAlert('Please select room number');
    }
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      // this.user = res;
      // if (this.user) {
      //   this.guestDetail.customerId = this.user.userId;
      // }
    });
  }

  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }


}
