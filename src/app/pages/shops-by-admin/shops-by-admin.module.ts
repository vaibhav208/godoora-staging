import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopsByAdminPageRoutingModule } from './shops-by-admin-routing.module';

import { ShopsByAdminPage } from './shops-by-admin.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ShopsByAdminPageRoutingModule
  ],
  declarations: [ShopsByAdminPage]
})
export class ShopsByAdminPageModule {}
