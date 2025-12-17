import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GuestsListPageRoutingModule } from './guests-list-routing.module';
import { GuestsListPage } from './guests-list.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { OptionPopoverComponent } from 'src/app/components/common/option-popover.component';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PopoverModule.forRoot(),
    GuestsListPageRoutingModule,
    GuestsListPage,
    OptionPopoverComponent
  ],
})
export class GuestsListPageModule {}
