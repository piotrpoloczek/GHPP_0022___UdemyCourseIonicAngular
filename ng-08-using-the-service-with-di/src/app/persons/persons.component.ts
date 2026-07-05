import { Component } from '@angular/core';

import { PersonsService } from './persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
export class PersonsComponent {
  personList: string[];

  constructor(prsService: PersonsService) {
    this.personList = prsService.persons;
  }
}
