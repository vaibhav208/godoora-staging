import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { Otp } from '../model/shop-keeper.model';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { VendorDeatil} from 'src/app/app.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  firstName: string;
  mobileNumber: string;
  password: string;
  cnfPassword: string;
  validForm: boolean;
  otp: string;
  @Input() type = false;
  @Input() enableRadio = false;
  user: any;
  showOTPContainer: boolean;
  showLoginContainer = true;
  otpObj: Otp;
  enableVerifyOtp: boolean;
  showPassContainer: boolean;
  firstTime: boolean;
  vendorDeatil: VendorDeatil;
  resendOTPButton: boolean;
  departments = [];
  is_guest = false;
  room_no: string;

  constructor(
    private appService: AppService,
    private modalCtrl: ModalController,
    private utilAlertService: UtilAlertService,
    private router: Router,
    private authService: SocialAuthService,
    private loadingController: LoadingController
  ) {
    this.otpObj = new Otp();
    this.getUserDetail();
    this.getVendorDeatil();
    this.resendOTPButton = false;
    this.getRespAfterGoogleSignin();
  }

  ngOnInit() {
  }

  setResendBtnInterval(intervalMilliseconds: number) {
    setTimeout(() => {
      this.resendOTPButton = true;
    }, intervalMilliseconds);
  }

  typeChnage(event) {
    if (event.detail) {
      this.type = event.detail.value;
    }
  }

  onGuestTypeChange(event) {
    this.is_guest = event.detail.checked;
  }

  async confirmMobile() {
    if (this.mobileNumber) {
      // if (this.mobileNumber.toString().length === 10) {
        const data = {
          phonenumber: this.mobileNumber,
          categoryid: this.vendorDeatil.idCategory,
          is_guest: this.is_guest ? 'Y' : 'N'
        };
        if(this.is_guest && this.room_no) {
          data['room_no'] = this.room_no;
          localStorage.setItem('room_no', this.room_no);
        }
        const loading = await this.loadingController.create({
          message: 'Loading...'
        });
        await loading.present();
        this.appService.confirmMobile(data).subscribe((res) => {
          if (res && res.body) {
            if (!res.body.error) {
              this.showOTPContainer = false;
              this.showLoginContainer = false;
              this.showPassContainer = true;
              this.firstTime = res.body.firstTime;
            } else {
              this.utilAlertService.showAlert(res.body.error);
            }
          }
          loading.dismiss();
        }, () => {
          loading.dismiss();
        });
      // } else {
      //   this.utilAlertService.showAlert('Enter Valid Phone Number');
      // }
    }

  }

  async onResendOTPClick() {
    if (this.mobileNumber) {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      this.appService.resentOTP({phoneNumber: this.mobileNumber}).subscribe((res) => {
        loading.dismiss();
        if (res && res.body) {
          if (!res.body.error) {
            this.resendOTPButton = false;
            this.setResendBtnInterval(30000);
          } else {
            this.utilAlertService.showAlert(res.body.error);
          }
        }
      }, () => {
        loading.dismiss();
      });
    }
  }

  async login() {
    if (this.mobileNumber && this.mobileNumber.toString().length === 10) {
      if (!this.firstTime || (this.firstTime && this.password === this.cnfPassword)) {
        const data = {
          name: this.firstName,
          description: '',
          phonenumber: this.mobileNumber,
          password: this.password,
          idCategory: this.vendorDeatil.idCategory,
          type: this.type ? 'S' : 'c'
        };
        const loading = await this.loadingController.create({
          message: 'Loading...'
        });
        await loading.present();
        this.appService.signup(data).subscribe((res) => {
          loading.dismiss();
          if (res && res.body) {
            if (!res.body.error) {
              this.user = res.body;
              localStorage.setItem('user', JSON.stringify(res.body));
              if (!res.body.confirmed) {
                this.showOTPContainer = true;
                this.showLoginContainer = false;
                this.showPassContainer = false;
                this.setResendBtnInterval(30000);
              } else {
                this.appService.setLoginFalg(true);
                this.appService.setUserDetail(res.body);
                this.dismiss(true);
              }
            } else {
              this.utilAlertService.showAlert(res.body.error);
            }
          } else {
            this.dismiss(false);
          }
        }, () => {
          loading.dismiss();
        });
      } else {
        this.utilAlertService.showAlert('Password missmatch');
      }
    } else {
      this.utilAlertService.showAlert('Enter Valid Phone Number');
    }
  }

  close() {
    this.dismiss();
  }

  async dismiss(flag = false) {
    await this.modalCtrl.dismiss(flag ? {flag} : false);
  }

  otpController(event, next, prev) {
    const beforeFormat = event.target.value;
    const afterFormat = (event.target.value).trim().replace(/[^\d]/g, '');
    const otpDetailsArray = Object.values(this.otpObj).join('');
    this.enableVerifyOtp = otpDetailsArray.length === 6 ? true : false;
    if (beforeFormat.trim().length === afterFormat.length) {
      if (next && afterFormat.length > 0) {
        next.setFocus();
      } else if (afterFormat.length === 0 && prev) {
        prev.setFocus();
      } else {
        return 0;
      }
    } else {
      event.target.value = afterFormat;
    }
  }

  confirmOtp() {
    if (this.otpObj && this.user) {
      const otpDetailsArray = Object.values(this.otpObj).join('');
      this.appService.confirmOTP({
        userId: this.user.userId,
        otp: otpDetailsArray
      }).subscribe((res) => {
        if (res && res.body) {
          if (!res.body.error) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && res.body.confirmed) {
              user.confirmed = true;
              this.appService.setLoginFalg(true);
              this.appService.setUserDetail(user);
              localStorage.setItem('user', JSON.stringify(user));
              this.dismiss(true);
            } else {
              this.utilAlertService.showSuccess(user.message);
              this.dismiss(false);
            }
          } else {
            this.utilAlertService.showAlert(res.body.error);
          }
        }
      });
    }
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
    });
  }

  getVendorDeatil() {
    this.appService.vendorDeatil.subscribe((res) => {
      if(res) {
        this.vendorDeatil = res;
        this.departments = res.departments;
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  getRespAfterGoogleSignin() {
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.loginToOurAppUsingGoogleId(user);
      }
    });
  }

  async loginToOurAppUsingGoogleId(user) {
    if (user) {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      const data = {
        name: user.name,
        description: '',
        phonenumber: user.id,
        // password: this.password,
        idCategory: this.vendorDeatil.idCategory,
        type: 'c'
      };
      this.appService.signup(data).subscribe((res) => {
        loading.dismiss();
        if (res && res.body) {
          if (!res.body.error) {
            this.user = res.body;
            localStorage.setItem('user', JSON.stringify(res.body));
            this.appService.setLoginFalg(true);
            this.appService.setUserDetail(res.body);
            this.dismiss(true);
          } else {
            this.utilAlertService.showAlert(res.body.error);
          }
        } else {
          this.dismiss(false);
        }
      }, () => {
        loading.dismiss();
      });
    }
  }

}
