import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VendorDeatil } from 'src/app/app.const';
import { AppService } from 'src/app/services/app.service';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.page.html',
  styleUrls: ['./create-slot.page.scss'],
})
export class CreateSlotPage implements OnInit {

  firstName: string;
  mobileNumber: string;
  vendorDeatil: VendorDeatil;

  constructor(
    private modalCtrl: ModalController,
    private appService: AppService,
    private utilAlertService: UtilAlertService
  ) { }

  ngOnInit() {
    this.getVendorDetail();
  }

  async dismiss(user= false) {
    await this.modalCtrl.dismiss({user});
  }

  close() {
    this.dismiss(false);
  }

  create() {
    if (this.firstName && this.mobileNumber) {
      if (this.mobileNumber.toString().length === 10) {
        const data = {
          name: this.firstName,
          description: '',
          phonenumber: this.mobileNumber,
          idCategory: this.vendorDeatil.idCategory,
          type: 'c',
          adminCreated: true
        };
        this.appService.signup(data).subscribe((res) => {
          if (res && res.body) {
            if (!res.body.error) {
              this.dismiss(res.body);
            } else {
              this.utilAlertService.showAlert(res.body.error);
            }
          } else {
            this.dismiss(false);
          }
        });
      } else {
        this.utilAlertService.showAlert('Enter Valid Phone Number');
      }
    }
  }

  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

}
