import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { VendorDeatil } from 'src/app/app.const';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrimunitPipe } from 'src/app/pipes/trimunit.pipe';
import { DepartmentsPage } from '../departments/departments.page';
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, TrimunitPipe, DepartmentsPage]
})
export class HomePage {

  public storeSearchValue: string;
  storesList: any[] = [];
  storeSearching = false;
  adminId: number;
  locations: any[] = [];
  selectedLocation: any;
  vendorDeatil: VendorDeatil;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
@ViewChild('slideWithLand', { static: false }) slideWithLand: typeof IonicSlides = IonicSlides;

  constructor(
    private router: Router,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController
  ) {
    this.getVendorDetail();
    this.selectedLocation = JSON.parse(localStorage.getItem('selectedLocation'));
  }

  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((vendor) => {
      this.vendorDeatil = vendor;
    });
  }

  ionViewWillEnter() {
    this.getCities();
    this.activatedRoute.params.subscribe((params) => {
      this.adminId = +params.id;
    });
  }

  // Method called when slide is changed by drag or navigation
  SlideDidChange(slideView) {
    // this.checkIfNavDisabled(slideView);
  }

  getCities() {
    this.appService.getCity().subscribe((res) => {
      if (res && res.body && res.body.length) {
        this.locations = res.body;
        if (!this.selectedLocation) {
          this.selectedLocation = res.body[0];
          localStorage.setItem('selectedLocation', JSON.stringify(this.selectedLocation));
        }
        this.storeByLocation();
      }
    });
  }

  slidesDidLoad(slides) {
    slides.startAutoplay();
  }

  async storeByLocation() {
    this.storesList = [];
    if (this.selectedLocation && this.vendorDeatil) {
      const obj = {
        locationId:  this.vendorDeatil.conceirge ? 0 : this.selectedLocation.locationId,
        category: this.vendorDeatil.idCategory,
        branch: this.vendorDeatil.branch === 'default' ? '' : this.vendorDeatil.branch
      };
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      this.appService.getStoreByLocation(obj).subscribe((res) => {
        loading.dismiss();
        if (res && res.body && res.body.length) {
          this.storesList = res.body;
        }
      }, () => {
        loading.dismiss();
      });
    }
  }

  onLocationChange(event) {
    if (event && event.detail && event.detail.value) {
        this.selectedLocation = event.detail.value;
        this.adminId = this.selectedLocation.userId;
        localStorage.setItem('selectedLocation', JSON.stringify(this.selectedLocation));
        this.storeByLocation();
    }
  }

  getStoreBasedOnSearch() {
    let replaceLeadingSpace = null;
    if (this.storeSearchValue) {
      replaceLeadingSpace = this.storeSearchValue.replace(/[^a-zA-Z'.-\s]/g, '');
      replaceLeadingSpace = replaceLeadingSpace.replace(/^\s+/, '');
    }
    if (replaceLeadingSpace && replaceLeadingSpace.length > 0) {
      this.searchStore(replaceLeadingSpace);
    } else {
      this.onStoreSearchCancel();
    }
  }

  searchStore(replaceLeadingSpace) {
    const query = {
      input: replaceLeadingSpace,
      locationId: this.selectedLocation.locationId,
      categoryId: this.vendorDeatil.idCategory
    };
    this.appService.searchStores(query).subscribe((res: any) => {
      this.storeSearching = true;
      if (res && res.body) {
        this.storesList = res.body;
      }
    });
  }

  searchStoreById() {
    if (this.adminId) {
      this.appService.getStoresByAdminId({adminId: this.adminId}).subscribe((res: any) => {
        this.storeSearching = true;
        if (res && res.body) {
          this.storesList = res.body;
        }
      });
    }
  }

  onStoreSearchCancel() {
    this.storeSearchValue = null;
    this.storeSearching = false;
    this.storesList = [];
    this.searchStore('a');
  }

  onStoreDetailClick(store) {
    if (store && (store.userId || store.loginId)) {
      if (store.adminCreated) {
        this.router.navigate(['/by-admin', store.userId]);
      } else {
        this.router.navigate(['/stores', store.loginId]);
      }
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.appService.setLoginFalg(true);
    this.appService.setUserDetail(null);
  }

}
