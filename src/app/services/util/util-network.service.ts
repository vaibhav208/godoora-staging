// import { Network } from '@ionic-native/network/ngx';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilNetworkService {
    account: Account;
    constructor(
        // private network: Network
    ) { }

    // get current status of internet
    getCurrentStatusOfInternet() {
        // const networkState = this.network.type;
        // const states = {};
        // states[this.network.Connection.UNKNOWN] = 'Unknown connection';
        // states[this.network.Connection.ETHERNET] = 'Ethernet connection';
        // states[this.network.Connection.WIFI] = 'WiFi connection';
        // states[this.network.Connection.CELL_2G] = 'Cell 2G connection';
        // states[this.network.Connection.CELL_3G] = 'Cell 3G connection';
        // states[this.network.Connection.CELL_4G] = 'Cell 4G connection';
        // states[this.network.Connection.CELL] = 'Cell generic connection';
        // states[this.network.Connection.NONE] = 'No network connection';
        // return states[networkState];
    }

    // to watch network for a disconnection
    getSubscribeToEventDisconnetNetwork() {
        // this.network.onDisconnect().subscribe(data => {
        //     localStorage.setItem('internet', 'false');
        // });
    }

    // to stop disconnect watch
    unSubscribeEventDisconnectNetwork(disconnectSubscription: any) {
        disconnectSubscription.unsubscribe();
    }

    // to watch network for a connection
    getSubscribeToEventOnConnectInternet() {
        // this.network.onConnect().subscribe(data => {
        //   localStorage.setItem('internet', 'true');
        // });
    }

    // to stop connect watch
    unsubscribeEventConnectInternet(connectSubscription: any) {
        connectSubscription.unsubscribe();
    }
}
