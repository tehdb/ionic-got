
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { GoTHouse } from '../../models/got-house.model';

@Component({
  selector: 'got-house',
  templateUrl: 'house-details.component.html',
})
export class HouseDetailsComponent implements OnInit {

  private _house: GoTHouse;

  @Input() set house(h: GoTHouse) {
    this._house = Object.assign({}, h);
  }


  ngOnInit() {
  }

}
