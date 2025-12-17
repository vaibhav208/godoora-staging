import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedSlotsPage } from './booked-slots.page';

const routes: Routes = [
  {
    path: '',
    component: BookedSlotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedSlotsPageRoutingModule {}
