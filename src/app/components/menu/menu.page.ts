import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { LoginPage } from 'src/app/pages/login/login.page';
import { ModalController, MenuController } from '@ionic/angular';
import { SocialAuthService } from '@abacritt/angularx-social-login'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  user: any;
  vendorDetail: any;

  constructor(
    public router: Router,
    private location: Location,
    private modalCtrl: ModalController,
    private appService: AppService,
    private authService: SocialAuthService,
    public menuController: MenuController
  ) {
  }

  ngOnInit() {
    this.getUserDetail();
    this.getVendorDetail();
  }

  logout() {
    this.menuController.close();
    const tempLocation = localStorage.getItem('selectedLocation');
    localStorage.clear();
    localStorage.setItem('selectedLocation', tempLocation);
    this.appService.setLoginFalg(false);
    this.appService.setUserDetail(null);
    this.router.navigate(['']);
    this.authService.signOut();
  }

  bookedList() {
    this.menuController.close();
    if (this.user) {
      if (this.user.type === 'c') {
        this.router.navigate(['/booked-slots']);
      } else {
        this.router.navigate(['/booked-customers']);
      }
    } else {
      this.openLogin(true);
    }
  }

  openLogin(flag = false) {
    this.menuController.close();
    this.presentLoginModal(flag);
  }

  async presentLoginModal(list = false) {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: LoginPage,
      componentProps: {
        enableRadio: true
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (!dataReturned.data) {
        localStorage.removeItem('user');
        localStorage.clear();
        this.appService.setLoginFalg(false);
        this.appService.setUserDetail(null);
      } else {
        if (list) {
          if (this.user.type === 'S') {
            this.router.navigate(['/booked-customers']);
          } else {
            this.router.navigate(['/booked-slots']);
          }
        }
      }
    });
    return await modal.present();
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
    });
  }

  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDetail = res;
    });
  }

  navigateBack() {
    this.location.back();
  }

  navigateToLink(item) {
    this.menuController.close();
    if (item.label === 'Booked List') {
      this.bookedList();
    } else {
      if (item.routerLink) {
        this.router.navigate([item.routerLink]);
      } else {
        window.open(item.extLink);
      }
    }
  }

  displayItem(item): boolean {
    let flag = true;
    if (item.label === 'My Services' && (!this.user || (this.user && this.user.type !== 'A'))) {
      flag = false;
    }
    return flag;
  }

}
