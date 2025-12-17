import { Component, OnInit } from '@angular/core';
import { VendorDeatil } from 'src/app/app.const';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-off-season',
  templateUrl: './off-season.component.html',
  styleUrls: ['./off-season.component.scss'],
})
export class OffSeasonComponent implements OnInit {

  vendorDeatil: VendorDeatil;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getVendorDeatil();
  }

  getVendorDeatil() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

}
