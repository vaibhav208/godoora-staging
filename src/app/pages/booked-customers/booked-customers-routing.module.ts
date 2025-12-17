import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedCustomersPage } from './booked-customers.page';

const routes: Routes = [
  {
    path: '',
    component: BookedCustomersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedCustomersPageRoutingModule {}
