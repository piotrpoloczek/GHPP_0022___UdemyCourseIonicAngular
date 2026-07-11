import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    private _places: Place[] = [
        new Place(
            'p1', 
            'Manhattan Mansion', 
            'In the heart of New York City.', 
            'https://upload.wikimedia.org/wikipedia/commons/0/0e/Manhattan_Mansion.jpg', 
            149.99
        ),
        new Place(
            'p2', 
            'L\'Amour Toujours', 
            'A romantic place in Paris.', 
            'https://upload.wikimedia.org/wikipedia/commons/6/6d/L%27Amour_Toujours.jpg', 
            189.99
        ),
        new Place(
            'p3', 
            'The Foggy Palace', 
            'A mysterious place in London.', 
            'https://upload.wikimedia.org/wikipedia/commons/3/3e/The_Foggy_Palace.jpg', 
            99.99
        ),
    ];

    get places() {
        return [...this._places];
    }

    constructor() {}
}

