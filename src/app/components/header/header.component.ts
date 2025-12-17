import { Component, OnInit } from '@angular/core';
import { LoginPage } from 'src/app/pages/login/login.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  vendorDetail: any;
  userDetail: any;
  isLandingPage = false;

  constructor(
    private appService: AppService,
    public router: Router,
    private location: Location,
  ) {
    this.setUserDetail();
    this.getVendorDetail();
    this.getUserDeatail();
  }

  ngOnInit() {}

  getClassName() {
    return (this.vendorDetail && this.router.url === '/landing' && (!this.vendorDetail.landingPage.slider.active && this.vendorDetail.landingPage.heroIntro.active)) ? 'absolute-header' : '';
  }

  setUserDetail() {
    if (localStorage.getItem('user')) {
      this.userDetail = JSON.parse(localStorage.getItem('user'));
      this.appService.setUserDetail(this.userDetail);
    }
  }

  getUserDeatail() {
    this.appService.userDetail.subscribe((res) => {
      this.userDetail = res;
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

  navigateOnLogoClick() {
    if(localStorage.getItem('originUrl')) {
      window.open(localStorage.getItem('originUrl'), '_self');
    } else {
      if(!this.vendorDetail.branch || this.vendorDetail.branch === 'default') {
        this.router.navigate(['/landing']);
      } else {
        this.router.navigate(['/' + this.vendorDetail.branch + '/landing']);
      }
    }
  }

  hideNagigationBackArrow() {
    return this.router.url.includes('/landing');
  }

}
