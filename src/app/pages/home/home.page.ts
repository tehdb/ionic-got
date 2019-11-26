import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GoTHouse } from '../../models/got-house.model';
import { HousesFacade } from '../../state/houses/houses.facade';

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  houses$: Observable<GoTHouse[]> = this.housesFacade.allHouses$

  constructor( private housesFacade: HousesFacade) {}

  ngOnInit() {
    this.housesFacade.loadHouses();
  }


  showDetail(house: GoTHouse) {
    console.log(house);
  }

}
