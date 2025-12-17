import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoresPageRoutingModule } from './stores-routing.module';
import { StoresPage } from './stores.page';
import { ComponentsModule } from 'src/app/components/components.module';
// import { CarouselModule } from 'ngx-bootstrap/carousel';
import { WebCheckinPage } from './web-checkIn-form.page';

// import { SignaturePadModule } from 'angular2-signaturepad';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselInModalComponent } from 'src/app/components/carousel-in-modal/carousel-in-modal.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CarouselModule,
    // CarouselModule.forRoot(),
    // SignaturePadModule,
    SharedModule,
    StoresPage,
    StoresPageRoutingModule,
    WebCheckinPage
  ],
  declarations: [ CarouselInModalComponent],
})
export class StoresPageModule {}