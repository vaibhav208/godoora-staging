import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.page.html',
  styleUrls: ['./shop-category.page.scss'],
})
export class ShopCategoryPage implements OnInit {

  admins = [];
  recentList = [];

  constructor(
    private appservice: AppService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAdmins();
  }

  getAdmins() {
    this.appservice.getAdmins().subscribe((res) => {
      if (res && res.body && res.body.length) {
        this.admins = res.body;
        this.recentList = JSON.parse(JSON.stringify(this.admins.slice(0, 2)));
      }
    });
  }

  onAdminClick(item) {
    if (item.type === 'A') {
      this.router.navigate(['/home', item.userId]);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
