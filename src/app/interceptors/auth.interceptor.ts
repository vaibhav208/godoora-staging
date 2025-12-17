import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AppService } from '../services/app.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private appService: AppService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const vendorDetail = this.appService.selectedVendor;
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Calcutta';
    
    const httpRequest = req.clone({
      headers: new HttpHeaders({
        'timezone': timezoneName ? timezoneName : 'Asia/Calcutta',
        'propertytimezone': (vendorDetail && vendorDetail.propertytimezone) ? vendorDetail.propertytimezone : 'Asia/Calcutta'
      })
    });
    return next.handle(httpRequest);
  }

  

}
