import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import moment from 'moment';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [IonicModule, DatePipe, CommonModule],
  selector: 'app-booked-slots',
  templateUrl: './booked-slots.page.html',
  styleUrls: ['./booked-slots.page.scss'],
})
export class BookedSlotsPage implements OnInit {

  bookedCustomers: any = [];
  user: any;
  selectedDate: any = new Date();
  vendorDeatil: any;

  constructor(
    private appService: AppService,
    private utilAlertService: UtilAlertService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getVendorDeatil();
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.search();
    }
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
    const obj = {
      userType: this.user.type,
      userId: this.user.userId,
      date: moment(this.selectedDate).format('DD-MM-YYYY')
    };
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.appService.getBookedCustomerList(obj).subscribe((res) => {
      if (res && res.body) {
        this.bookedCustomers = res.body;
      }
      loading.dismiss();
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

  cancelAppointment(item, index) {
    const query = {
      bookingId: item.idBooking
    };
    this.appService.cancelSlot(query).subscribe((res) => {
      if (res && res.body) {
        this.bookedCustomers.splice(index, 1);
        this.utilAlertService.showSuccess('Your slot is cancelled');
      }
    });
  }

  getVendorDeatil() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

}
