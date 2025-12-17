import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedCustomersPageRoutingModule } from './booked-customers-routing.module';

import { BookedCustomersPage } from './booked-customers.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BookedCustomersPageRoutingModule
  ],
  declarations: [BookedCustomersPage],
})
export class BookedCustomersPageModule {}
