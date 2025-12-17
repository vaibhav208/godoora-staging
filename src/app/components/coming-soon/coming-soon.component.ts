import { Component, OnInit } from '@angular/core';
import { VendorDeatil } from 'src/app/app.const';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
})
export class ComingSoonComponent implements OnInit {

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
