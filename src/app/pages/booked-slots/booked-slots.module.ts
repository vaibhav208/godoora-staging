import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedSlotsPageRoutingModule } from './booked-slots-routing.module';

import { BookedSlotsPage } from './booked-slots.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PopoverModule.forRoot(),
    BookedSlotsPageRoutingModule,
    BookedSlotsPage
  ],
  declarations: []
})
export class BookedSlotsPageModule {}
