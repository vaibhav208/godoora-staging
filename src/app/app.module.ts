import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_ID } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageModule } from './pages/login/login.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ConfirmModalPageModule } from './pages/confirm-modal/confirm-modal.module';
import { CreateSlotPageModule } from './pages/create-slot/create-slot.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HeaderComponent } from './components/header/header.component';
import { MenuPage } from './components/menu/menu.page';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { OffSeasonComponent } from './components/off-season/off-season.component';
import { FooterPage } from './components/footer/footer.page';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { SharedModule } from './shared.module';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        MenuPage,
        
        ComingSoonComponent,
        OffSeasonComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        LoginPageModule,
        SocialLoginModule,
        CreateSlotPageModule,
        ConfirmModalPageModule,
        SharedModule,
        FooterPage,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })], providers: [
        StatusBar,
        SplashScreen,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('520508100358-nc2pkgmhrss0ar89bqdhqtun3fztshcuh.apps.googleusercontent.com')
                    }
                ]
            } as SocialAuthServiceConfig,
        },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: APP_ID, useValue: 'godoora-app' },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
