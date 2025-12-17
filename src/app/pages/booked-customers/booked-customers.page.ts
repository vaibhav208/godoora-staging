import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopKeeperDetail } from '../model/shop-keeper.model';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { LoadingController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-booked-customers',
  templateUrl: './booked-customers.page.html',
  styleUrls: ['./booked-customers.page.scss'],
})
export class BookedCustomersPage implements OnInit {

  bookedCustomers: any = [];
  user: ShopKeeperDetail;
  selectedUser: ShopKeeperDetail;
  selectedDate: any = new Date();
  storeId: string;
  vendorDeatil: any;

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilAlertService: UtilAlertService,
    private loadingController: LoadingController,
    public popoverController: PopoverController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserDetail();
    this.getVendorDeatil();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.activatedRoute.params.subscribe((params) => {
      if (params) {
        this.storeId = params.id;
        if (this.storeId) {
          this.selectedUser = this.user.shops.find((item) => {
            return item.phonenumber === this.storeId;
          });
        } else {
          this.selectedUser = this.user;
        }
        if (this.selectedUser) {
          this.search();
        }
      }
    });
  }

  selectPreviousDate() {
    this.selectedDate = moment(this.selectedDate).subtract(1, 'days');
    this.bookedCustomers = [];
    this.search();
  }

  selectNextDate() {
    this.selectedDate = moment(this.selectedDate).add(1, 'days');
    this.bookedCustomers = [];
    this.search();
  }

  async search() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    const obj = {
      userType: this.selectedUser.type,
      userId: this.selectedUser.userId,
      date: moment(this.selectedDate).format('DD-MM-YYYY')
    };
    this.bookedCustomers = [];
    this.appService.getBookedCustomerList(obj).subscribe((res) => {
      loading.dismiss();
      if (res && res.body) {
        this.bookedCustomers = res.body;
      }
    }, () => {
      loading.dismiss();
    });
  }

  createAppointment() {
    if (this.selectedUser && this.selectedUser.loginId) {
      this.router.navigate(['/stores', this.selectedUser.loginId], { queryParams: { adminCreated: true } });
    }
  }

  async statusUpdate(item, status, index) {
    item.options = false;
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    const query = {
      idBooking: item.idBooking,
      status
    };
    this.appService.updateStatus(query).subscribe((res) => {
      if (res && res.body) {
        loading.dismiss();
        this.bookedCustomers[index].bookingStatus = res.body.status;
        this.utilAlertService.showSuccess('Your slot status updated successfully');
      }
    }, () => {
      loading.dismiss();
    });
  }

  async confirmCancelAppointment(item, index) {
    item.options = false;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you want to cancel this request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.cancelAppointment(item, index);
          }
        }
      ]
    });
    await alert.present();
  }

  async cancelAppointment(item, index) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    const query = {
      bookingId: item.idBooking
    };
    this.appService.cancelSlot(query).subscribe((res) => {
      if (res && res.body) {
        loading.dismiss();
        this.bookedCustomers.splice(index, 1);
        this.utilAlertService.showSuccess('Your slot is cancelled');
      }
    }, () => {
      loading.dismiss();
    });
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
      this.selectedUser = res;
    });
  }

  getVendorDeatil() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

  editShop() {
    this.router.navigate(['/shop-keeper']);
  }

  isTodayCheck() {
    const today = moment(new Date()).format('DD-MM-YYYY');
    const selectDate = moment(this.selectedDate).format('DD-MM-YYYY');
    return today === selectDate ? true : false;
  }

}
