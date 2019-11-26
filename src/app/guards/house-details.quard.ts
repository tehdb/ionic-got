import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HousesFacade } from '../state/houses/houses.facade';
import { GoTHouse } from '../models/got-house.model';

@Injectable()
export class HouseDetailsGuard implements CanActivate {
  currentHouse$: Observable<GoTHouse> = this.housesFacade.currentHouse$;

  constructor(
    private housesFacade: HousesFacade,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.currentHouse$.pipe(
        map(ch => {
          if (ch.name !== 'unknown') {
            return true;
          }

          this.router.navigate(['/home']);
          return false;
        })
      );
    }
}
