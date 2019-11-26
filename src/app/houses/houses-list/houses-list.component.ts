import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GoTHouse } from '../../models/got-house.model';
import { HousesFacade } from '../../state/houses/houses.facade';

import filter from 'ramda/src/filter';
import includes from 'ramda/src/includes';
import toLower from 'ramda/src/toLower';
import trim from 'ramda/src/trim';
import chain from 'ramda/src/chain'
import isEmpty from 'ramda/src/isEmpty';

@Component({
  selector: 'got-houses',
  templateUrl: 'houses-list.component.html',
  styleUrls: ['houses-list.component.scss'],
})
export class HousesListComponent implements OnInit {
  private houses$: Observable<GoTHouse[]> = this.housesFacade.allHouses$;
  private houses: GoTHouse[];
  private filteredHouses: GoTHouse[];
  private searchTerm = '';
  private loading;

  constructor(
    private housesFacade: HousesFacade,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    this.loadingPresent();

    this.houses$.subscribe((houses) => {
      if (!isEmpty(houses)) {
        this.houses = houses;
        this.filteredHouses = houses;
        this.loadingDismiss();
      }
    });
  }

   async loadingPresent() {
    this.loading = await this.loadingController.create({
      message: 'Loading Data...',
      duration: 0
    });

    this.loading.present();
  }

  async loadingDismiss() {
    await this.loading.dismiss();
  }

  // *ngFor="let house of houses$ | async"
  showDetail(house: GoTHouse) {
    this.housesFacade.selectHouse( house.name );
    this.router.navigate(['/detail']);
  }

  filterItems() {
    const searchTerm = trim(toLower(this.searchTerm));
    const filterFn = (h: GoTHouse) => includes(searchTerm, toLower(h.name));

    this.filteredHouses = isEmpty(searchTerm) ? this.houses : filter(filterFn, this.houses);
  }
}
