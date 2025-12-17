import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { ModalController, IonSlides } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Vendors } from 'src/app/app.const';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { GridGalleryComponent } from './grid-gallery/grid-gallery.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@Component({
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, SafePipe, GridGalleryComponent, CarouselModule],
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  user: any;
  vendorDeatil: any;
  showDialog: boolean;
  selectedVideoUrl: any;
  limit = 15;
  totalBranches = [];
  selectedBranch = 'default';
  smallScreen = false;
  @ViewChild('slideWithLand', { static: false }) slideWithLand: IonSlides;

  @HostListener("window:resize", ['$event'])
  onResize(event) {
    this.smallScreen = this.appService.checkSmallScreen();
  }

  constructor(
    private router: Router,
    private appService: AppService,
    private modalCtrl: ModalController,
    private utilAlertService: UtilAlertService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) {
    this.totalBranches = Vendors[window.location.host];
    this.route.params.subscribe((params) => {
      localStorage.setItem('branch', 'default');
      this.selectedBranch = 'default';
      if (params && params.branch) {
        localStorage.setItem('branch', params.branch);
        this.selectedBranch = params.branch;
      }
      this.setVendor(this.selectedBranch);
    });
    this.getUserDetail();
    this.getVendorDetail();
    this.smallScreen = this.appService.checkSmallScreen();
  }

  setVendor(branch) {
    this.vendorDeatil = this.totalBranches.find((item) => {
      return item.branch === branch;
    });
    if (!this.vendorDeatil) {
      this.vendorDeatil = this.totalBranches[this.totalBranches.length - 1];
    }
    this.appService.setVendorDetail(this.vendorDeatil);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserDetail();
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.appService.setPwaPromtObj(e);
    });
    window.addEventListener('appinstalled', (event) => {
      this.utilAlertService.showSuccess('Added to homescreen');
    });
  }

  navigateToBranchPage(branchDeatil) {
    if (branchDeatil.branch !== 'default') {
      this.router.navigate([`/${branchDeatil.branch}/landing`]);
    } else {
      this.router.navigate([`/landing`]);
    }
  }

  // Method called when slide is changed by drag or navigation
  SlideDidChange(slideView) {
    // this.checkIfNavDisabled(object, slideView);
  }

  listMyBusiness() {
    if (!this.user) {
      this.openLogin();
    } else {
      if (this.user.firstTime === false &&
        (this.user.availableDays && this.user.availableDays.length)) {
        this.router.navigate(['/booked-customers']);
      } else {
        this.router.navigate(['/shop-keeper']);
      }
    }
  }

  bookSlot() {
    this.router.navigate(['/by-admin/', 158]);
  }

  myServices() {
    if (this.user) {
      this.router.navigate(['/user-shops']);
    } else {
      this.openLogin(true);
    }
  }

  allAppointments() {
    if (this.user) {
      this.router.navigate(['/booked-customers']);
    } else {
      this.openLogin(true);
    }
  }

  editShop() {
    if (this.user) {
      this.router.navigate(['/shop-keeper']);
    } else {
      this.openLogin(true);
    }
  }

  bookMyAppontments() {
    if (this.user) {
      if (this.user.type === 'A') {
        this.router.navigate(['/booked-customers']);
      } else {
        if (this.user.type === 'S') {
          this.router.navigate(['/booked-customers']);
        } else {
          this.router.navigate(['/booked-slots']);
        }
      }
    } else {
      this.openLogin(true);
    }
  }

  openLogin(enableRadio = false) {
    this.presentLoginModal(enableRadio);
  }

  async presentLoginModal(enableRadio) {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: LoginPage,
      componentProps: {
        enableRadio: enableRadio ? true : false
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      setTimeout(() => {
        if (this.user && dataReturned.data) {
          if (this.user.firstTime === false &&
            (this.user.availableDays && this.user.availableDays.length)) {
            this.router.navigate(['/booked-customers']);
          } else {
            if (this.user.type === 'A') {
              this.router.navigate(['/booked-customers']);
            } else if (this.user.type === 'S') {
              this.router.navigate(['/booked-customers']);
            } else {
              this.router.navigate(['/booked-slots']);
            }
          }
        } else {
          localStorage.removeItem('user');
          this.appService.setLoginFalg(true);
          this.appService.setUserDetail(null);
        }
      });
    });
    return await modal.present();
  }

  viewGuests() {
    this.router.navigate(['/guests-list']);
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

  showDialogMethod(slide) {
    if (slide && slide.videoId) {
      this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + slide.videoId)
      this.showDialog = true;
    }
    return false;
  }

  scrollToMasonry() {
    if (this.vendorDeatil.landingPage.experience.active) {
      const goyannaExp = document.getElementsByClassName("goyanna_exp");
      if (goyannaExp.length > 0) {
        goyannaExp.item(0).scrollIntoView({ behavior: "smooth" }); 
      }
    }
  }


  navgigate(slide: any) {
    if(slide.btn) {
      if(slide.btn.routerLink) {
        this.router.navigate([slide.btn.routerLink]);
      } else if(slide.btn.extLink) {
        window.open(slide.btn.extLink);
      }
    }
  }

}
