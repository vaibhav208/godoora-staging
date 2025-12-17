import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ConfirmModalPage } from '../confirm-modal/confirm-modal.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { LoginPage } from '../login/login.page';
import { CreateSlotPage } from '../create-slot/create-slot.page';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { VendorDeatil } from 'src/app/app.const';
import { WebCheckInModel } from '../model/web-checkIn.model';
import { CarouselInModalComponent } from 'src/app/components/carousel-in-modal/carousel-in-modal.component';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { WebCheckinPage } from './web-checkIn-form.page';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';


@Component({
  standalone: true,
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
  imports: [IonicModule, CarouselModule, CommonModule, FormsModule, SafePipe, WebCheckinPage]
})
export class StoresPage implements OnInit {

    bannerCarouselOptions: OwlOptions = {
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoHeight: true,
    autoWidth: true,
    nav: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    navText: ['<ion-icon name="chevron-back-outline"></ion-icon>', '<ion-icon name="chevron-forward-outline"></ion-icon>'],
    center: true,
    responsive: {
      0: {
        items: 1.2 // On mobile, show 1 full and a peek of the next
      },
      768: {
        items: 3 // On larger screens, show 3
      }
    },
  };

    menuCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  };



  storeDetail: any;
  selectedDate: any = new Date();
  selectedSlot: any;
  user: any;
  adminCreated: boolean;
  vendorDeatil: VendorDeatil;
  serviceDetail: any;
  comments: string;
  showMenu = false;
  webCheckin: WebCheckInModel;
  submit = false;
  invalidFlags: any;
  smallScreen = false;
  gallery = [
    {path: 'https://source.unsplash.com/433x649/?Uruguay'},
    {path: 'https://source.unsplash.com/530x572/?Jamaica'},
    {path: 'https://source.unsplash.com/531x430/?Kuwait'},
    {path: 'https://source.unsplash.com/586x1073/?Bermuda'},
    {path: 'https://source.unsplash.com/500x571/?Ecuador'},
    {path: 'https://source.unsplash.com/579x518/?Virgin Islands (British)'},
    {path: 'https://source.unsplash.com/503x548/?Angola'},
    {path: 'https://source.unsplash.com/511x630/?Mauritania'},
    {path: 'https://source.unsplash.com/414x767/?Sri Lanka'},
    {path: 'https://source.unsplash.com/443x704/?St. Helena'},
    {path: 'https://source.unsplash.com/441x1145/?Namibia'}, 
    {path: 'https://source.unsplash.com/491x1097/?Samoa'},
    {path: 'https://source.unsplash.com/570x851/?Eritrea'},
    {path: 'https://source.unsplash.com/560x1072/?Iraq'},
    {path: 'https://source.unsplash.com/551x598/?Togo'},
    {path: 'https://source.unsplash.com/518x813/?Romania'}
  ];
  @ViewChild('scrollMe') private content: any;
  onResize(event) {
    this.smallScreen = this.appService.checkSmallScreen();
  }


  week = [];
  selectedSlots = [];
  multiDateStoreDetail = [];

  constructor(
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    private navController: NavController,
    private router: Router,
    private utilAlertService: UtilAlertService,
    private loadingController: LoadingController,
    public sanitizer: DomSanitizer
  ) {
    this.smallScreen = this.appService.checkSmallScreen();
    this.webCheckin = new WebCheckInModel();
    this.getUserDetail();
    this.getVendorDeatil();
    this.getFullWeek(new Date());
  }


  ngOnInit() {
  }

  onDateChange(date: any) {
    this.selectedDate = new Date(date);
    this.getWeekStoreDetail(this.selectedDate);
  }

  scrollToBottomOnInit() {
    if(this.content) {
      this.content.scrollToBottom(300);
    }
  }

  getFullWeek (_day: Date) {
    this.week = [];
    const numberOfdays = this.smallScreen ? 3 : 7;
    for (let i = 0; i < numberOfdays; i++) {
      let first = _day.getDate() - _day.getDay() + i;
      let day = new Date(_day.setDate(first));
      this.week.push(day);
    }
  }

  async getWeekStoreDetail(_day: Date) {
    const numberOfdays = this.smallScreen ? 3 : 7;
    const queryArr = [];
    for (let i = 0; i < numberOfdays; i++) {
      const newDate = moment(_day).add(i, 'days');
      const query = {
        loginId: this.storeDetail.loginId,
        date: newDate.format('DD-MM-YYYY')
      };
      queryArr.push(query);
    }
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.appService.requestDataFromMultipleSources(queryArr).subscribe((res) => {
      if(res && res.length) {
        this.multiDateStoreDetail = res;
      }
      loading.dismiss();
    }, () => {
      loading.dismiss();
    })
  }

  ionViewWillEnter() {
    this.storeDetail = null;
    this.selectedDate = new Date();
    this.selectedSlot = null;
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param && param.adminCreated) {
        this.adminCreated = !!param.adminCreated;
        this.storeDetail = JSON.parse(localStorage.getItem('user'));
        if (this.vendorDeatil.conceirge) {
          this.getServiceDetail();
        }
      }
    });
    this.activatedRoute.data.subscribe((data) => {
      if(data) {
        if (data.storeDetail) {
          this.storeDetail = data.storeDetail.body;
          if (this.vendorDeatil.conceirge) {
            this.getServiceDetail();
          }
        }
        if(data.multiDateStoreDetail) {
          this.multiDateStoreDetail = data.multiDateStoreDetail;
        }
      }

    });
  }

  getServiceDetail() {
    this.serviceDetail = this.appService.getServiceDetail(this.storeDetail);
  }

  selectPreviousDate() {
    this.selectedSlot = undefined;
    this.storeDetail.listOfSlots = [];
    this.selectedDate = moment(this.selectedDate).subtract(1, 'days');
    const query = {
      loginId: this.storeDetail.loginId,
      date: moment(this.selectedDate).format('DD-MM-YYYY')
    };
    this.appService.getStoreDetail(query).subscribe((res) => {
      this.storeDetail = res.body;
    });
  }

  selectNextDate() {
    this.selectedSlot = undefined;
    this.storeDetail.listOfSlots = [];
    this.selectedDate = moment(this.selectedDate).add(1, 'days');
    const query = {
      loginId: this.storeDetail.loginId,
      date: moment(this.selectedDate).format('DD-MM-YYYY')
    };
    this.appService.getStoreDetail(query).subscribe((res) => {
      this.storeDetail = res.body;
    });
  }

  selectNextWeek() {
    this.selectedSlots = [];
    this.selectedDate = this.dateStringToDateObj(this.multiDateStoreDetail[0].date);
    this.selectedDate.setDate(this.selectedDate.getDate() + (this.smallScreen ? 3 : 7));
    this.getWeekStoreDetail(this.selectedDate);
  }

  selectPrevWeek() {
    this.selectedSlots = [];
    this.selectedDate = this.dateStringToDateObj(this.multiDateStoreDetail[0].date);
    this.selectedDate.setDate(this.selectedDate.getDate() -  (this.smallScreen ? 3 : 7) );
    this.getWeekStoreDetail(this.selectedDate);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  
  selectMenuSlide(index) {
    console.log(index);
  }

  async openCarouselInModal(index, array) {
    if(array && array.length) {
      const modal = await this.modalCtrl.create({
        animated: true,
        showBackdrop: true,
        cssClass: 'carousel-in-modal',
        component: CarouselInModalComponent,
        componentProps: {
          imgPath: array[index].path
        }
      });
      return await modal.present();
    }
  }

  onSlotSelection(slot) {
    if (slot) {
      this.selectedSlot = slot;
    }
  }

  onSlotBulkSelection(slot, day=new Date()) {
    day = this.dateStringToDateObj(day);
    if (slot && day) {
      const index = this.selectedSlots.findIndex((item) => {
        return item.slot.slotTime === slot.slotTime && day.getTime() === item.day.getTime();
      })
      if(index === -1) {
        this.selectedSlots.push({
          slot,
          day
        })
      } else {
        this.selectedSlots.splice(index, 1); 
      }
    }
  }

  async successModal(message = '') {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: ConfirmModalPage,
      componentProps: {
        type: this.user.type,
        message
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
    });
    return await modal.present();
  }

  async book(user = this.user) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    if (user) {
      if (this.storeDetail && this.selectedSlot && this.selectedDate) {
        const slotDeatil: any = {
          bookingDate:  moment(this.selectedDate).format('DD-MM-YYYY'),
          registerId: this.storeDetail.registerId,
          slotTime: this.selectedSlot.slotTime,
          userId: user.userId,
          categoryId: this.vendorDeatil.idCategory
        };
        if (this.serviceDetail.checkinForm) {
          slotDeatil.webCheckinDetails = this.webCheckin;
        }
        if (this.vendorDeatil && this.vendorDeatil.conceirge) {
          slotDeatil.comments = this.comments;
        }
        const room_no = localStorage.getItem('room_no') ? JSON.parse(localStorage.getItem('room_no')) : null ;
        if (room_no) {
          slotDeatil.room_no = room_no;
        }
        this.appService.bookSlot(slotDeatil).subscribe((res) => {
          this.selectedSlot = undefined;
          loading.dismiss();
          if (res && res.body) {
            if (!res.body.error) {
              this.successModal('Thankyou! Your request has been received. One of our team will get in touch with you shortly.');
              setTimeout(() => {
                this.dismiss();
                if (this.adminCreated) {
                  this.navController.navigateRoot('/booked-customers');
                } else {
                  this.navController.navigateRoot('/booked-slots');
                }
              }, 2000);
            } else {
              this.utilAlertService.showAlert(res.body.error);
            }
          }
        }, () => {
          loading.dismiss();
        });
      }
    } else {
      this.openLoginModal(true);
    }
  }

  async bulkBooking() {
    if(this.user) {
      if(this.selectedSlots && this.selectedSlots.length && this.storeDetail) {
        this.selectedSlots.forEach(element => {
          setTimeout(async () => {
            const slotDeatil: any = {
              bookingDate:  moment(element.day).format('DD-MM-YYYY'),
              registerId: this.storeDetail.registerId,
              slotTime: element.slot.slotTime,
              userId: this.user.userId,
              categoryId: this.vendorDeatil.idCategory
            };
            const loading = await this.loadingController.create({
              message: 'Loading...'
            });
            await loading.present();
            this.appService.bookSlot(slotDeatil).subscribe((res) => {
              loading.dismiss();
              if (res && res.body) {
                if (!res.body.error) {
                  // this.successModal('Thankyou! Your request has been received. One of our team will get in touch with you shortly.');
                  setTimeout(() => {
                    this.dismiss();
                    if (this.adminCreated) {
                      this.navController.navigateRoot('/booked-customers');
                    } else {
                      this.navController.navigateRoot('/booked-slots');
                    }
                  }, 2000);
                } else {
                  this.utilAlertService.showAlert(res.body.error);
                }
              }
            }, () => {
              loading.dismiss();
            });
          }, 100)
        });
      }
    } else {
      this.openLoginModal(true);
    }
  }

  bookSlot() {
    if(!this.selectedSlot) {
      this.scrollToBottomOnInit();
      return;
    }
    if (this.serviceDetail.checkinForm) {
      this.submit = true;
      this.invalidFlags = {};
      if (!this.webCheckin.emailId || !this.webCheckin.guestName || !this.webCheckin.contactNumber ||
        !this.webCheckin.address || !this.webCheckin.numberOfGuests || !this.webCheckin.emergencyContact ||
        !this.webCheckin.idProof || !this.webCheckin.healthIssues || !this.webCheckin.travelHistory ||
        !this.webCheckin.covidContact || !this.webCheckin.aarogyaSetuapp) {
          return false;
      } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.webCheckin.emailId))) {
        this.invalidFlags.email = true;
        return false;
      } else if (this.webCheckin.contactNumber && this.webCheckin.contactNumber.toString().length !== 10) {
        this.invalidFlags.phone = true;
        return false;
      }
    }

    if (this.adminCreated) {
      this.openCreateSlotModal();
    } else {
      if (localStorage.getItem('user')) {
        this.book();
      } else {
        this.openLoginModal();
      }
    }
  }

  async openCreateSlotModal() {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: CreateSlotPage,
      componentProps: {
        type: false
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data && dataReturned.data.user) {
        this.book(dataReturned.data.user);
      }
    });
    return await modal.present();
  }

  async openLoginModal(openList = false) {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: LoginPage,
      componentProps: {
        type: false
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data && dataReturned.data.flag) {
        if (openList) {
          this.router.navigate(['booked-slots']);
        } else {
          this.book();
        }
      } else {
        localStorage.removeItem('user');
        this.appService.setLoginFalg(false);
        this.appService.setUserDetail(null);
      }
    });
    return await modal.present();
  }

  isTodayCheck() {
    const today = moment(new Date()).format('DD-MM-YYYY');
    const selectDate = moment(this.selectedDate).format('DD-MM-YYYY');
    return today === selectDate ? true : false;
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
    });
  }

  getVendorDeatil() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

  myAppointment() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['booked-slots']);
    } else {
      this.openLoginModal(true);
    }
  }

  getActiveDayClass(day: Date) {
    return (this.selectedDate && moment(day).format('DD-MM-YYYY') === moment(this.selectedDate).format('DD-MM-YYYY')) ? 'active' : '';
  }

  async changeSelectedDate(day:Date) {
    this.selectedDate = day;
    const query = {
      loginId: this.storeDetail.loginId,
      date: moment(this.selectedDate).format('DD-MM-YYYY')
    };
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.storeDetail.listOfSlots = [];
    this.appService.getStoreDetail(query).subscribe((res) => {
      loading.dismiss();
      this.storeDetail = res.body;
    }, ()=> {
      loading.dismiss();
    });
  }

  isSlotActive(slot, day) {
    const foundItem = this.selectedSlots.find((item) => {
      day = this.dateStringToDateObj(day);
      return item.slot.slotTime === slot.slotTime && item.day.getTime() === day.getTime();
    })
    return foundItem ? true : false;
  }

  dateStringToDateObj(day: any, saperator='-') {
    if(day && typeof(day) === 'string' && day.includes('-')) {
      const dayArray: any = day.split(saperator);
      return new Date(dayArray[2], (dayArray[1] - 1), dayArray[0])
    } else {
      return day;
    }
  }

}