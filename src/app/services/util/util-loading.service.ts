import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilLoadingService {
  private loading: any;
  constructor(
    private loadingController: LoadingController
  ) { }


  // Hide the current toast message
  // hideLoading() {
  //   this.loading = this.loadingController.dismiss();
  // }

  showAutoHideLoader(messageString: string, hideDuration: any) {
    this.loadingController.create({
      message: messageString,
      duration: hideDuration
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        // console.log('Loading dismissed! after 2 Seconds');
      });
    });
  }

  showLoaderWithOptions(options: any) {
    this.loadingController.create({
      spinner: options.spinner,
      duration: options.duration,
      message: options.message,
      translucent: options.translucent,
      cssClass: options.className,
      backdropDismiss: options.backdropDismiss
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        // console.log('Loading dismissed!');
      });
    });
  }

  showLoader(messageString: string) {
    this.loadingController.create({
      message: messageString
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        // console.log('Loading dismissed!');
      });
    });
    // this.hideLoader();
  }

  hideLoader() {
    this.loadingController.dismiss();
  }


}


