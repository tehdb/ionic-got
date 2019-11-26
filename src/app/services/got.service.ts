import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
// import { mp } from 'rxjs/operators';

// import { contains, find, concat } from 'ramda';
import find from 'ramda/src/find';
import concat from 'ramda/src/concat';
import includes from 'ramda/src/includes';

import { GoTHouse } from '../models/got-house.model';

@Injectable({
  providedIn: 'root',
})
export class GoTService {
  private API_PATH = 'https://www.anapioficeandfire.com/api';
  private PAGE_SIZE = 50;
  private filter = []; // ['hasWords=true', 'hasTitles=true', 'hasSeats=true'];

  constructor(private http: HttpClient) {}

  retrieveAllHouses(): Observable<GoTHouse[]> {
    return from(this.getAllPages());
  }


  getAllPages(): Promise<GoTHouse[]> {
    return new Promise((resolve) => {
      const firstPageUrl = `${this.API_PATH}/houses?pageSize=${this.PAGE_SIZE}&${this.filter.join('&')}`;
      let allHouses: GoTHouse[] = [];

      const getNextPage = (nextPageUrl) => {
        const sub = this.http.get<GoTHouse[]>(nextPageUrl, { observe: 'response' })
          .subscribe((res) => {
            sub.unsubscribe();
            allHouses = concat(res.body, allHouses);
            const linkHeader = res.headers.get('Link');
            const links = linkHeader.split(',');
            const nextLink = find(v => includes('next', v), links);

            if (nextLink) {
              const nextUrl = nextLink.match(/(?!<).*(?=>)/)[0];
              getNextPage(nextUrl);
            } else {
              resolve(allHouses);
            }
        });
      };

      getNextPage(firstPageUrl);
    });
  }


  // retrieveCurrentLordOfTheHouse(kj
}

