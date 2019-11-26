
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GoTHouse } from '../../models/got-house.model';
import { HousesFacade } from '../../state/houses/houses.facade';

@Component({
  templateUrl: 'detail.page.html'
})
export class DetailPage implements OnInit {
  currentHouse$: Observable<GoTHouse> = this.housesFacade.currentHouse$;

  constructor( private housesFacade: HousesFacade) {}

  ngOnInit() {}

}
