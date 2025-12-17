import { Component, OnInit } from '@angular/core';
import { ShopKeeperDetail, AvailableDays } from '../model/shop-keeper.model';
import { AppService } from 'src/app/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmModalPage } from '../confirm-modal/confirm-modal.page';
import { ModalController, LoadingController } from '@ionic/angular';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { VendorDeatil } from 'src/app/app.const';
import { ParseNumberPipe } from 'src/app/pipes/parse-number.pipe';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { TrimunitPipe } from 'src/app/pipes/trimunit.pipe';



@Component({
  standalone: true,
  imports: [TrimunitPipe, IonicModule, ParseNumberPipe, FormsModule],
  selector: 'app-shop-keeper',
  templateUrl: './shop-keeper.page.html',
  styleUrls: ['./shop-keeper.page.scss'],
})
export class ShopKeeperPage implements OnInit {

  categories: any;
  user: ShopKeeperDetail;
  selectedUser: ShopKeeperDetail;
  daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  addressList: any = [];
  selectedAddress: any;
  storeId: string;
  // selectedCategory: any;
  locations = [];
  selectedLocation: any;
  vendorDeatil: VendorDeatil;
  firstTime = true;
  department: any;
  selectedService: any;
  departments = [];

  constructor(
    private appService: AppService,
    private router: Router,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private utilAlertService: UtilAlertService,
    private loadingController: LoadingController
  ) {
    this.user = new ShopKeeperDetail();
    this.selectedUser = new ShopKeeperDetail();
    this.getUserDetail();
    this.getVendorDetail();
    // this.selectedLocation = JSON.parse(localStorage.getItem('selectedLocation'));
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe((params) => {
      if (params) {
        this.storeId = params.id;
      }
      this.selectedAddress = undefined;
      this.addressList = [];
      this.getLocations();
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getAllServices();
      // this.getCategory();
      if (this.user) {
        this.setAvailableDays();
      } else {
        this.user = new ShopKeeperDetail();
        this.setAvailableDays();
      }
    });
  }

  getCategory() {
    this.appService.getCategory().subscribe((res) => {
      if (res && res.body && res.body.length) {
        this.categories = res.body;
      }
    });
  }

  getAllServices(): any {
    this.department = this.departments.find((val: any) => {
      if (val && val.name === this.user.name) {
        return val;
      }
    });
  }

  // onCategoryChange(event) {
  //   if (event && event.detail && event.detail.value) {
  //     this.selectedCategory = this.categories.find((category) => {
  //       return category.name === event.detail.value;
  //     });
  //   }
  // }

  onServiceChange(event) {

  }

  onLocationChange(event) {
    if (event && event.detail && event.detail.value) {
        this.selectedLocation = event.detail.value;
    }
  }

  getLocations() {
    this.appService.getCity().subscribe((res) => {
      if (res && res.body && res.body.length) {
        this.locations = res.body;
        if (this.selectedUser && this.locations && this.locations.length) {
          this.selectedLocation = this.locations.find((val) => {
            return val.locationId === this.selectedUser.locationId;
          });
        }
      }
    });
  }

  setAdminAvailableDays() {
    this.selectedUser = this.user;
    if (this.selectedUser.formattedAddress) {
      this.selectedAddress = {
        lng: this.selectedUser.lng,
        lat: this.selectedUser.lat,
        photoReference: this.selectedUser.photoReference,
        formattedAddress: this.selectedUser.formattedAddress
      };
    }
    this.daysInWeek.forEach((element: string) => {
      const obj = new AvailableDays();
      obj.day = element;
      const index = this.selectedUser.availableDays.findIndex((item) => {
        return item.day === obj.day;
      });
      if (index === -1) {
        this.selectedUser.availableDays.push(obj);
      } else {
        this.selectedUser.availableDays[index].checked = true;
      }
    });
  }

  setAvailableDays() {
    if (!this.storeId) {
      this.setAdminAvailableDays();
      return;
    }
    this.selectedUser = this.user.shops.find((item) => {
      return item.phonenumber === this.storeId;
    });
    if (this.selectedUser) {
      if (this.selectedUser.formattedAddress) {
        this.selectedAddress = {
          lng: this.selectedUser.lng,
          lat: this.selectedUser.lat,
          photoReference: this.selectedUser.photoReference,
          formattedAddress: this.selectedUser.formattedAddress
        };
      }
      this.daysInWeek.forEach((element: string) => {
        const obj = new AvailableDays();
        obj.day = element;
        const index = this.selectedUser.availableDays.findIndex((item) => {
          return item.day === obj.day;
        });
        if (index === -1) {
          this.selectedUser.availableDays.push(obj);
        } else {
          this.selectedUser.availableDays[index].checked = true;
        }
      });
    }
  }

  checkIfSlotschecked() {
    let flag = false;
    if (this.selectedUser && this.selectedUser.availableDays) {
      for (const item of this.selectedUser.availableDays ) {
        if (item.checked) {
          flag = true;
          break;
        }
      }
    }
    return flag;
  }
  async successModal(msg = '') {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: ConfirmModalPage,
      componentProps: {
        type: this.selectedUser.type,
        msg
      }
    });
    return await modal.present();
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  convertDetailBeforeSave() {
    return this.selectedUser.availableDays.filter((item) => {
      return  item.checked;
    });
  }

  async save() {
    // !selectedLocation || shopForm.invalid || checkIfSlotschecked()
    let allowFlag = true;
    if (!this.selectedUser.name) {
      allowFlag = false;
      this.utilAlertService.showAlert('Please Enter Name');
      return;
    }
    if (!this.selectedUser.phonenumber) {
      allowFlag = false;
      this.utilAlertService.showAlert('Please Enter Phone Number');
      return;
    }
    if (this.vendorDeatil.updateShopLocation && !this.selectedLocation ) {
      allowFlag = false;
      this.utilAlertService.showAlert('Please select Location');
      return;
    }
    if (!this.checkIfSlotschecked()) {
      allowFlag = false;
      this.utilAlertService.showAlert('Please select the slots');
      return;
    }

    if (allowFlag && this.selectedUser) {
      this.selectedUser.availableDays = this.convertDetailBeforeSave();
      // if (this.selectedAddress) {
      //   this.selectedUser.formattedAddress = this.selectedAddress.formattedAddress;
      //   this.selectedUser.lng = this.selectedAddress.lng;
      //   this.selectedUser.lat = this.selectedAddress.lat;
      //   this.selectedUser.photoReference = this.selectedAddress.photoReference;
      // }
      if (this.selectedLocation) {
        this.selectedUser.locationId = this.selectedLocation.locationId;
      }
      this.selectedUser.idCategory = this.vendorDeatil.idCategory;
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      this.appService.createStore(this.selectedUser).subscribe((res) => {
        loading.dismiss();
        if (res && res.body) {
          if (this.user.type === 'A') {
            const index = this.user.shops.findIndex((item) => {
              return item.userId === res.body.userId;
            });
            if (index !== -1) {
              this.user.shops[index] = res.body;
            }
          } else {
            this.user = res.body;
          }
          this.successModal();
          setTimeout(() => {
            this.dismiss();
            this.appService.setUserDetail(this.user);
            localStorage.setItem('user', JSON.stringify(this.user));
            this.selectedUser = new ShopKeeperDetail();
            if (this.user.type === 'A') {
              this.router.navigate(['/user-shops']);
            } else {
              this.router.navigate(['/booked-customers']);
            }
          }, 2000);
        }
      }, () => {
        loading.dismiss();
      });
    }
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
    });
  }

  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((res) => {
      if (res) {
        this.vendorDeatil = res;
        this.departments = this.vendorDeatil.departments;
      }
    });
  }

  searchAddress(event) {
    this.selectedAddress = undefined;
    const val = event.target.value;
    this.addressList = [];
    if (val) {
      const query = {
        query: val
      };
      this.appService.searchShopAddress(query).subscribe((res) => {
        console.log(res);
        if (res && res.body) {
          this.addressList = res.body;
        }
      });
    }
  }

  selectAddress(address) {
    this.selectedAddress = address;
    this.addressList = [];
  }

}
