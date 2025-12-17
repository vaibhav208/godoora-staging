import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import moment from 'moment';
import { LoadingController, PopoverController } from '@ionic/angular';
import { OptionPopoverComponent } from 'src/app/components/common/option-popover.component';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-guests-list',
  templateUrl: './guests-list.page.html',
  styleUrls: ['./guests-list.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GuestsListPage implements OnInit {

  guestList = [];
  vendorDeatil: any;
  today = new Date();
  checkIn: any;
  checkOut: any;
  user: any;

  constructor(
    private appService: AppService,
    private loadingController: LoadingController,
    private popoverController: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkIn = moment(this.today).format('YYYY-MM-DD');
    this.checkOut = moment(this.today).format('YYYY-MM-DD');
  }

  ionViewWillEnter() {
    this.getVendorDetail();
    this.getUserDetail();
  }

  async getGuests() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    const params = {
      categoryId: this.vendorDeatil.idCategory,
      checkIn: moment(this.checkIn).format('YYYY-MM-DDT00:00:00.000+05:30'),
      checkOut: moment(this.checkOut).format('YYYY-MM-DDT23:59:59.000+05:30')
    };
    this.appService.getGuests(params).subscribe((res) => {
      if (res && res.body) {
        this.guestList = res.body;
      }
      loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }

  addGuest() {
    this.router.navigate(['/guest']);
  }

  async presentOptionPopover(ev: any, item: any) {
    ev = {
      target : {
        getBoundingClientRect : () => {
          return {
            top: 200
          };
        }
      }
    };
    const popover = await this.popoverController.create({
      component: OptionPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        guest: item
      },
      showBackdrop: false
    });
    return await popover.present();
  }

  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
      this.getGuests();
    });
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
    });
  }

}
