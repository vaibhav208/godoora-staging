import { Component, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Vendors } from './app.const';
import { AppService } from './services/app.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
declare var ga;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements AfterViewInit {

  vendorDetail: any;
  dataSrc = 'blue-theme';
  vendorId: string;
  bodyHeight: any = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService
  ) {
    this.setVendor();
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     ga('set', 'page', event.urlAfterRedirects);
    //     ga('send', 'pageview');
    //   }
    // });
  }

  setManifestFile() {
    if(this.vendorDetail) {
      document.querySelector('#my-manifest-placeholder') ? (document.querySelector('#my-manifest-placeholder')['href'] = environment.serverUrl + 'scheduling/manifestfile?categoryId=' + this.vendorDetail.idCategory) : '';
    }
  }  

  ngOnInit(){
    const branchName = this.activatedRoute.snapshot.paramMap.get('branchName')
    console.log(branchName);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const headerHeight = document.querySelector('ion-header') ? document.querySelector('ion-header').offsetHeight : 0;
      const footerHeight = document.querySelector('ion-footer') ? document.querySelector('ion-footer').offsetHeight : 0;
      this.bodyHeight = (headerHeight + footerHeight);
    }, 1000);
  }

  setVendor() {
    let branch = 'default';
    if(localStorage.getItem('branch')) {
      branch = localStorage.getItem('branch');
    }
    const pathArray = window.location.pathname.split('/');
    if(pathArray && pathArray.length >= 3 && pathArray.includes('landing')) {
      branch = pathArray[1];
    }
    localStorage.setItem('branch', branch);
    const branchList = Vendors[window.location.host];
    if(branchList && branchList.length) {
      this.vendorDetail =  branchList.find((item) => {
        return item.branch === branch;
      });
      if(!this.vendorDetail) {
        this.vendorDetail = branchList[branchList.length - 1];
      }
      this.appService.setVendorDetail(this.vendorDetail);
      this.setManifestFile();
      this.appendGaTrackingCode();
      this.dataSrc = this.vendorDetail ? this.vendorDetail.theme : '';
      const htmlTag = document.getElementsByTagName('html');
      if (htmlTag && htmlTag.length) {
        htmlTag[0].className = this.dataSrc;
      }
      localStorage.setItem('originUrl', window.location.href);
      this.changeFavicon();
      this.initializeApp();
    }
  }


  private appendGaTrackingCode() {
    if(this.vendorDetail) {
      try {
        const script = document.createElement('script');
        script.innerHTML = `
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', '${this.vendorDetail.gAnalyticscode ? this.vendorDetail.gAnalyticscode : 'UA-144064030-1'}', 'auto');  // Change the UA-ID to the one you got from Google Analytics
        `;
        document.head.appendChild(script);
        this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            ga('set', 'page', event.urlAfterRedirects);
            ga('send', 'pageview');
          }
        });
      } catch (ex) {
       console.error('Error appending google analytics');
       console.error(ex);
      }
    }
  }

  changeFavicon() {
    const link = this.vendorDetail.favIconLink;
    document.title = this.vendorDetail.title;
    let $favicon: any = document.querySelector('link[rel="icon"]');
    if ($favicon !== null) {
      $favicon.href = link;
    } else {
      $favicon = document.createElement('link');
      $favicon.rel = 'icon';
      $favicon.href = link;
      document.head.appendChild($favicon);
    }
  }

}
