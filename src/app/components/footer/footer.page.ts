import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  imports: [IonicModule, RouterModule, CommonModule]
})
export class FooterPage implements OnInit, AfterViewInit {

  showBtn = false;
  deferredPrompt: any = null;
  vendorDeatil: any;

  constructor(
    private appService: AppService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getVendorDeatil();
  }

  ngAfterViewInit() {
    this.getDeferredPrompt();
  }

  getVendorDeatil() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

  getDeferredPrompt() {
    this.appService.pwaPromtObj.subscribe((res) => {
      if (res) {
        this.deferredPrompt = res;

        // Using vendor-specific timer if available, else default to 3s
        const timer = this.vendorDeatil?.pwaInstallTimer ?? 3000;

        setTimeout(() => {
          const appInstalled = JSON.parse(localStorage.getItem('appInstalled') || 'false');
          const remindLater = JSON.parse(sessionStorage.getItem('remindLater') || 'false');

          if (!appInstalled && !remindLater) {
            this.presentAlertConfirm(); // fires after vendor-specific delay
          }
        }, timer);
      }
    });
  }

  addToHome() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          localStorage.setItem('appInstalled', JSON.stringify(true));
        }
        this.deferredPrompt = null;
      });
    }
  }

  async presentAlertConfirm() {
    if (this.deferredPrompt) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Install App?',
        message: 'Looks like you are enjoying using the experience app! Do you want to add a shortcut to your screen?',
        buttons: [
          {
            text: 'Remind me later',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              sessionStorage.setItem('remindLater', JSON.stringify(true));
              console.log('User chose to be reminded later');
            }
          },
          {
            text: 'OK',
            handler: () => {
              this.addToHome();
            }
          }
        ]
      });
      await alert.present();
    }
  }
}
