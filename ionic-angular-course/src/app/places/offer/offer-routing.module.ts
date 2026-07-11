import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferPage } from './offer.page';

const routes: Routes = [
  {
    path: '',
    component: OfferPage
  },
  {
    path: 'new-offer',
    loadChildren: () =>
      import('./new-offer/new-offer.module').then(
        m => m.NewOfferPageModule
      )
  },
  {
    path: 'edit-offer',
    loadChildren: () =>
      import('./edit-offer/edit-offer.module').then(
        m => m.EditOfferPageModule
      )
  },
  {
    path: 'place-bookings',
    loadChildren: () =>
      import('./place-bookings/place-bookings.module').then(
        m => m.PlaceBookingsPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferPageRoutingModule {}