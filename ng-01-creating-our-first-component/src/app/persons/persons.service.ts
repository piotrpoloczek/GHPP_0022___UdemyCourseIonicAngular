import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

interface SwapiPerson {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class PersonsService {
  personsChanged = new Subject<string[]>();
  persons: string[] = [];

  constructor(private http: HttpClient) {}

  fetchPersons() {
    this.http
      .get<SwapiPerson[]>('https://swapi.info/api/people')
      .pipe(
        map(resData => {
          return resData.map(character => character.name);
        })
      )
      .subscribe(transformedData => {
        this.persons = transformedData;
        this.personsChanged.next(this.persons.slice());
      });
  }

  addPerson(name: string) {
    this.persons.push(name);
    this.personsChanged.next(this.persons.slice());
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => person !== name);
    this.personsChanged.next(this.persons.slice());
  }
}