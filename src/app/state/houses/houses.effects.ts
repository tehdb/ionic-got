import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/nx';
import { Actions, Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { GoTHouse } from '../../models/got-house.model';
import { GoTService } from '../../services/got.service';
import { HousesActionTypes, HousesLoaded, LoadHouses } from './houses.actions';
import { HousesState } from './houses.reducer';

@Injectable()
export class HousesEffects {
  @Effect()
  loadHouses$ = this.dataPersistence.fetch(HousesActionTypes.LoadHouses, {
    run: (action: LoadHouses, state: HousesState) => {
      return this.gotService.retrieveAllHouses().pipe(map((res: GoTHouse[]) => new HousesLoaded(res)))
    },

    onError: (action: LoadHouses, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<HousesState>,
    private gotService: GoTService
  ) {}
}
