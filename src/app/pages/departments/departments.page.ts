import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { IonCard } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-departments',
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
})
export class DepartmentsPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  @Input() departments = [];

  constructor(
    private router: Router,
    public appService: AppService
  ) { }

  ngOnInit() {
    this.getVendorDetail();
  }

  navigateToServices(store) {
    if (store && (store.userId || store.loginId)) {
      const departmentDetail = this.appService.getDepartmentDetail(store);
      if (store.adminCreated) {
        if (departmentDetail.routerLink) {
          this.router.navigate(['/by-admin', store.userId]);
        } else {
          window.open(departmentDetail.extLink, 'self');
        }
      }
    }
  }

  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((res: any) => {
      if (res) {
        this.departments = res.departments;
      }
    });
  }

}
