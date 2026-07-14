import { Injectable } from '@angular/core';
import { Booking } from './bookings.model';

@Injectable({ providedIn: 'root' })
export class BookingsService {
    private _bookings: Booking[] = [
        {
            id: '1',
            placeId: 'p1',
            userId: 'u1',
            placeTitle: 'Manhattan Mansion',
            guestNumber: 2
        },
        {
            id: '2',
            placeId: 'p2',
            userId: 'u1',
            placeTitle: 'L\'Amour Toujours',
            guestNumber: 2
        }
    ];

    get bookings() {
        return [...this._bookings];
    }

}
