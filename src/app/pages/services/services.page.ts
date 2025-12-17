import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  @Input() services = [];

  constructor(
    private router: Router,
    public appService: AppService
  ) { }

  ionViewWillEnter() {
  }

  ngOnInit() {
  }

  onServiceClick(service) {
    const serviceDetail = this.appService.getServiceDetail(service);
    if (service && service.loginId) {
      if (serviceDetail.routerLink) {
        this.router.navigate(['/stores', service.loginId]);
      } else {
        window.open(serviceDetail.extLink, 'self');
      }
    }
  }

}
