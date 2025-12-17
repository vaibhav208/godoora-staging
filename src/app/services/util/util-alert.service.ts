import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilAlertService {

  private toast: any;
  constructor(public toastController: ToastController) { }

  // Display the toast message on the top of the page
  showAlert(messageText: string) {
      this.toast = this.toastController.create({
          message: messageText,
          duration: 2000,
          position: 'top',
          color: 'danger'
      }).then((toastData) => {
          toastData.present();
      });
  }

  showSuccess(messageText: string) {
    this.toast = this.toastController.create({
        message: messageText,
        duration: 2000,
        position: 'top',
        color: 'success'
    }).then((toastData) => {
        toastData.present();
    });
}

  // Display the message on the bottom of the page
  showToastOnBottom(messageText: string) {
      this.toast = this.toastController.create({
          message: messageText,
          duration: 2000,
          position: 'bottom'
      }).then((toastData) => {
          toastData.present();
      });
  }

  showToastOnMiddle(messageText: string) {
      this.toast = this.toastController.create({
          message: messageText,
          duration: 2000,
          position: 'middle'
      }).then((toastData) => {
          toastData.present();
      });
  }

  // Hide the current toast message
  hideToast() {
      this.toast = this.toastController.dismiss();
  }
}
