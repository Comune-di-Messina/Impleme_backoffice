import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Observable, of, EMPTY } from 'rxjs'
import { mergeMap, take } from 'rxjs/operators'

import { ManageReservationsService } from '../../../../services/api/prenota-ufficio/manage-reservations.service'
import { Reservation } from '../../../../models/prenota-ufficio/reservation'

@Injectable({
  providedIn: 'root',
})
export class ReservationResolverService implements Resolve<Reservation> {
  constructor(private router: Router, private reservationsService: ManageReservationsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Reservation> | Observable<never> {
    const reservationId = route.paramMap.get('reservationId')

    return this.reservationsService.getReservation(reservationId).pipe(
      take(1),
      mergeMap(response => {
        if (response) {
          return of(response)
        } else {
          // id not found
          this.router.navigate(['/prenota-ufficio/reservations'])
          return EMPTY
        }
      }),
    )
  }
}
