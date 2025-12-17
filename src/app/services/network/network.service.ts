import { Injectable } from '@angular/core';
// import { Network } from '@ionic-native/network/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';


export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  count = 0;
  isConnected: Observable<boolean>;

  constructor(
    // private network: Network,
    private toastController: ToastController,
    private plt: Platform,
  ) {
    // this.plt.ready().then(() => {
    //   this.initializeNetworkEvents();
    //   const status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
    //   this.status.next(status);
    // });
  }

  public initializeNetworkEvents() {
    // this.network.onDisconnect().subscribe(() => {
    //   if (this.status.getValue() === ConnectionStatus.Online) {
    //     // console.log('WE ARE OFFLINE');
    //     this.updateNetworkStatus(ConnectionStatus.Offline);
    //   }
    // });

    // this.network.onDisconnect().subscribe(() => {
    //   // console.log('network was disconnected :-(');
    // });

    // this.network.onConnect().subscribe(() => {
    //   if (this.status.getValue() === ConnectionStatus.Offline) {
    //     // console.log('WE ARE ONLINE');
    //     this.updateNetworkStatus(ConnectionStatus.Online);
    //   }
    // });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';

    if (connection === 'Offline') {
      const now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time)
      const offlineTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
      localStorage.setItem('offlineTime', offlineTime);
    }

    if (connection === 'Online') {
      const now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time)
      const onlineTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
      localStorage.store('onlineTime', onlineTime);
    }

    this.status.next(status);
    const showNetworkStatusConst = localStorage.getItem('showNetworkStatus');
    let showNetworkStatus = null;
    if (showNetworkStatusConst !== null && showNetworkStatusConst !== undefined) {
      showNetworkStatus = JSON.parse(showNetworkStatusConst);
    }
    if (showNetworkStatus === false) {
      return;
    }
    this.count = this.count + 1;
    if (this.count === 1) {
      return;
    }
    const toast = this.toastController.create({
      message: `You are now ${connection}`,
      duration: 2000,
      position: 'bottom'
    });
    toast.then(toastMsg => toastMsg.present());
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }

}
