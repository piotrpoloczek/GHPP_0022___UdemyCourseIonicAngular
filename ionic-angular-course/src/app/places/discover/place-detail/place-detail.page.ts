import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  place?: Place;

  constructor(
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');

      if (!placeId) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      const fetchedPlace = this.placesService.getPlace(placeId);

      if (!fetchedPlace) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      this.place = fetchedPlace as Place;
    });
  }

  async onBookPlace(): Promise<void> {
    if (!this.place) {
      return;
    }

    const modal = await this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {
        selectedPlace: this.place
      }
    });

    await modal.present();

    const resultData = await modal.onDidDismiss();

    console.log(resultData.data, resultData.role);
  }
}