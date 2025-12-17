import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserShopsPageRoutingModule } from './user-shops-routing.module';

import { UserShopsPage } from './user-shops.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    UserShopsPageRoutingModule,
    UserShopsPage
  ],
  declarations: []
})
export class UserShopsPageModule {}
