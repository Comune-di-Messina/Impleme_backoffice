import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RoomBookingBookingsService } from 'src/app/services/api/room-bookings'
import * as Formatter from 'src/app/utils/formatters'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class PrenotazioneSalaViewComponent implements OnInit {
  subRoute: any = null
  numeroPratica: string = null
  roomBooking: any = null
  data = []
  errorMessage: string = null

  constructor(
    private route: ActivatedRoute,
    private roomBookingBookingsService: RoomBookingBookingsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subRoute = this.route.params.subscribe(params => {
      this.numeroPratica = params.numeroPratica
      this.loadRoomBooking()
    })
  }

  ngOnDestroy() {
    if (this.subRoute) {
      this.subRoute.remove()
    }
    this.subRoute = null
  }

  loadRoomBooking() {
    this.roomBookingBookingsService.view(this.numeroPratica).subscribe(
      data => {
        this.roomBooking = data
        // console.log('roomBooking', this.roomBooking);
      },
      error => {
        if (error.status === 403) {
          this.errorMessage = error.error
            ? error.error?.message
            : 'Si è verificato un errore. Verrai riportato alla lista delle prenotazioni'
          setTimeout(() => {
            this.router.navigateByUrl('/bookings/index')
          }, 1500)
        }
      },
    )
  }
}
