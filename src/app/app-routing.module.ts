import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { OffSeasonComponent } from './components/off-season/off-season.component';


const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'stores/:id',
    loadChildren: () => import('./pages/stores/stores.module').then( m => m.StoresPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'booked-slots',
    loadChildren: () => import('./pages/booked-slots/booked-slots.module').then( m => m.BookedSlotsPageModule)
  },
  {
    path: 'confirm-modal',
    loadChildren: () => import('./pages/confirm-modal/confirm-modal.module').then( m => m.ConfirmModalPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: ':branch/landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'shop-keeper/:id',
    loadChildren: () => import('./pages/shop-keeper/shop-keeper.module').then( m => m.ShopKeeperPageModule)
  },
  {
    path: 'shop-keeper',
    loadChildren: () => import('./pages/shop-keeper/shop-keeper.module').then( m => m.ShopKeeperPageModule)
  },
  {
    path: 'booked-customers',
    loadChildren: () => import('./pages/booked-customers/booked-customers.module').then( m => m.BookedCustomersPageModule)
  },
  {
    path: 'booked-customers/:id',
    loadChildren: () => import('./pages/booked-customers/booked-customers.module').then( m => m.BookedCustomersPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'user-shops',
    loadChildren: () => import('./pages/user-shops/user-shops.module').then( m => m.UserShopsPageModule)
  },
  {
    path: 'create-slot',
    loadChildren: () => import('./pages/create-slot/create-slot.module').then( m => m.CreateSlotPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'by-admin/:id',
    loadChildren: () => import('./pages/shops-by-admin/shops-by-admin.module').then( m => m.ShopsByAdminPageModule)
  },
  // {
  //   path: 'departments',
  //   loadChildren: () => import('./pages/departments/departments.module').then( m => m.DepartmentsPageModule)
  // },
  // {
  //   path: 'services/:id',
  //   loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
  // },
  {
    path: 'guest',
    loadChildren: () => import('./pages/guest/guest.module').then( m => m.GuestPageModule)
  },
  {
    path: 'guests-list',
    loadChildren: () => import('./pages/guests-list/guests-list.module').then( m => m.GuestsListPageModule)
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent
  },
  {
    path: 'off-season',
    component: OffSeasonComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
