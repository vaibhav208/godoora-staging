import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopCategoryPageRoutingModule } from './shop-category-routing.module';

import { ShopCategoryPage } from './shop-category.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ShopCategoryPageRoutingModule
  ],
  declarations: [ShopCategoryPage]
})
export class ShopCategoryPageModule {}
