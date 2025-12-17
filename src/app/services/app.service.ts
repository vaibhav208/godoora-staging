import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createRequestOption } from './util/request-util';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private loginUrl = environment.serverUrl + 'scheduling/user/signup';
    private resentOTPUrl = environment.serverUrl + 'scheduling/resentOTP';
    private confirmMobileUrl = environment.serverUrl + 'scheduling/isExistingUser';
    private otpUrl = environment.serverUrl + 'scheduling/confirmUser';
    private storeSearchUrl = environment.serverUrl + 'scheduling/store';
    private storeResourceUrl = environment.serverUrl + 'scheduling/storeavailability';
    private bookUrl = environment.serverUrl + 'scheduling/book';
    private updateStatusUrl = environment.serverUrl + 'scheduling/updateStatus';
    private bookedCustomerListUrl = environment.serverUrl + 'scheduling/slots';
    private searchAddressUrl = environment.serverUrl + 'scheduling/findPlaces';
    private getAdminsUrl = environment.serverUrl + 'scheduling/admins';
    private getCityUrl = environment.serverUrl + 'scheduling/getCity';
    private getCategoryUrl = environment.serverUrl + 'scheduling/getCategory';
    private getLocationUrl = environment.serverUrl + 'scheduling/storebylocation';
    private getAdminsByIdUrl = environment.serverUrl + 'scheduling/storeByAdmin';
    private deleteShopUrl = environment.serverUrl + 'scheduling/user';
    private roomResourceUrl = environment.serverUrl + 'scheduling/rooms';
    private guestResourceUrl = environment.serverUrl + 'scheduling/addGuest';
    private guestsListResourceUrl = environment.serverUrl + 'scheduling/guests';

    public loginFlag: BehaviorSubject<any> = new BehaviorSubject(false);
    public userDetail: BehaviorSubject<any> = new BehaviorSubject(null);
    public vendorDeatil: BehaviorSubject<any> = new BehaviorSubject(null);
    public pwaPromtObj: BehaviorSubject<any> = new BehaviorSubject(null);

    public allDepartments = [];
    public selectedVendor = null;

    constructor(
        protected http: HttpClient
    ) {
        this.getVendorDetail();
    }

    getVendorDetail() {
        this.vendorDeatil.subscribe((res: any) => {
          if (res) {
            this.allDepartments = res.departments;
            this.selectedVendor = res;
          }
        });
    }

    confirmMobile(credentials): Observable<any> {
        return this.http.post(this.confirmMobileUrl, credentials,
            { headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'), observe: 'response' });
    }

    signup(credentials): Observable<any> {
        return this.http.post(this.loginUrl, credentials,
            { headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'), observe: 'response' });
    }

    resentOTP(req?: any): Observable<any> {
        const params = createRequestOption(req);
        return this.http.get(this.resentOTPUrl,
            { params, headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'), observe: 'response' }
        );
    }

    deleteShop(req?: any): Observable<any> {
        const params = createRequestOption(req);
        return this.http.delete(this.deleteShopUrl, {params});
    }

    confirmOTP(req?: any): Observable<any> {
        return this.http.post(this.otpUrl, req,
            { headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'), observe: 'response' });
    }

    searchShopAddress(req?: any) {
        const params = createRequestOption(req);
        return this.http.get(this.searchAddressUrl, { params, observe: 'response' });
    }

    searchStores(req?: any): Observable<any>  {
        const params = createRequestOption(req);
        return this.http.get(this.storeSearchUrl, { params, observe: 'response' });
    }

    getStoreDetail(req?: any): Observable<any>  {
        const params = createRequestOption(req);
        return this.http.get(this.storeResourceUrl, { params, observe: 'response' });
    }

    public requestDataFromMultipleSources(reqArr: any): Observable<any[]> {
        const data = [];
        reqArr.forEach((req) => {
            const params = createRequestOption(req);
            data.push(this.http.get(this.storeResourceUrl, { params, observe: 'body' }));
        });
        return forkJoin(data);
    }

    getAdmins(): Observable<any>  {
        return this.http.get(this.getAdminsUrl, { observe: 'response' });
    }

    getAdminsById(req?: any): Observable<any>  {
        const params = createRequestOption(req);
        return this.http.get(this.getAdminsUrl, {params, observe: 'response' });
    }

    getCity(): Observable<any> {
        return this.http.get(this.getCityUrl, { observe: 'response' });
    }

    getStoreByLocation(req?: any): Observable<any> {
        const params = createRequestOption(req);
        return this.http.get(this.getLocationUrl, {params, observe: 'response' });
    }

    getStoresByAdminId(req?: any): Observable<any>  {
        const params = createRequestOption(req);
        return this.http.get(this.getAdminsByIdUrl, { params, observe: 'response' });
    }

    bookSlot(data?: any): Observable<any>  {
        return this.http.post(this.bookUrl, data, { observe: 'response' });
    }

    cancelSlot(req?: any): Observable<any>  {
        const params = createRequestOption(req);
        return this.http.delete(this.bookUrl, { params, observe: 'response' });
    }

    updateStatus(req?: any): Observable<any>  {
        // const params = createRequestOption(req);
        return this.http.post(this.updateStatusUrl, req, { observe: 'response' });
    }

    createStore(data?: any): Observable<any>  {
        return this.http.post(this.storeResourceUrl, data, { observe: 'response' });
    }

    getCategory(req?: any): Observable<any>  {
        const params = createRequestOption(req);
        return this.http.get(this.getCategoryUrl, { params, observe: 'response' });
    }

    getBookedCustomerList(req?: any): Observable<any> {
        const params = createRequestOption(req);
        return this.http.get(this.bookedCustomerListUrl, { params, observe: 'response' });
    }

    getRooms(req?: any): Observable<any> {
        const params = createRequestOption(req);
        return this.http.get(this.roomResourceUrl, { params, observe: 'response' });
    }

    saveGuestDetail(req): Observable<any> {
        return this.http.post(this.guestResourceUrl, req, { observe: 'response' });
    }

    getGuests(req): Observable<any> {
        const params = createRequestOption(req);
        return this.http.get(this.guestsListResourceUrl, { params, observe: 'response' });
    }

    setLoginFalg(falg) {
        this.loginFlag.next(falg);
    }

    setUserDetail(userDetail) {
        if (userDetail) {
            localStorage.setItem('user', JSON.stringify(userDetail));
        }
        this.userDetail.next(userDetail);
    }

    setVendorDetail(vendorDeatil) {
        this.vendorDeatil.next(vendorDeatil);
    }

    setPwaPromtObj(obj) {
        this.pwaPromtObj.next(obj);
    }

    getDepartmentDetail(department): any {
        if (department) {
            const departmentName = department.name ? department.name : department;
            let selectedDepartment: any;
            if (department && this.allDepartments && this.allDepartments.length) {
                for (const departmentItem of this.allDepartments) {
                    if (departmentItem.name === departmentName) {
                        selectedDepartment = departmentItem;
                        break;
                    }
                }
            }
            return selectedDepartment ? selectedDepartment : null;
        }
    }

    getServiceDetail(service): any {
        if (service) {
            const serviceName = service.name ? service.name : service;
            let selectedService: any;
            if (service && this.allDepartments && this.allDepartments.length) {
                for (const department of this.allDepartments) {
                    for (const serviceItem of department.services) {
                        if (serviceItem.name === serviceName) {
                            selectedService = serviceItem;
                            break;
                        }
                        if (selectedService) {
                            break;
                        }
                    }
                }
            }
            return selectedService ? selectedService : null;
        }
    }

    public getServiceIcon(service): string {
        if (service) {
            const serviceName = service.name ? service.name : service;
            let selectedService: any;
            if (service && this.allDepartments && this.allDepartments.length) {
                for (const department of this.allDepartments) {
                    for (const serviceItem of department.services) {
                        if (serviceItem.name === serviceName) {
                            selectedService = serviceItem;
                            break;
                        }
                        if (selectedService) {
                            break;
                        }
                    }
                }
            }
            return selectedService ? selectedService.icon : '';
        }
    }

    getDepartmentIcon(department): string {
        if (department) {
            const departmentName = department.name ? department.name : department;
            let obj: any = {};
            if (department && this.allDepartments && this.allDepartments.length) {
              obj = this.allDepartments.find((item: any) => {
                if (item.name ===  departmentName ) {
                  return item;
                }
              });
            }
            return obj ? obj.icon : '';
        }
    }

    checkSmallScreen() {
        let flag = true;
        if(window.matchMedia('(min-width: 767.98px)').matches) {
            flag = false;
        }
        return flag;
    }
}
