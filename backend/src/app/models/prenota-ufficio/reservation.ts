import { Office } from './office'
import { TimeSlot } from './time-slot'
import { PublicService } from './public-service'

export enum ReservationStatus {
  RICHIESTA = 'RICHIESTA',
  CONFERMATA = 'CONFERMATA',
  CONFIRMED = 'CONFIRMED',
  ESEGUITA = 'ESEGUITA',
  CANCELLATA = 'CANCELLATA',
  REVOCATA = 'REVOCATA',
}

export interface Reservation {
  id: string
  office: Office
  publicService: PublicService
  date: Date
  startTime: string
  endTime: string
  status: ReservationStatus
  userId: string
  qrcode: string
  notes: string
}

export interface ReservationPayload {
  date?: string
  municipalityId?: string
  officeId?: string
  timeSlotId?: string
  publicServiceId?: string
  user?: {
    name: string
    surname: string
    fiscalCode: string
    email: string
    telNumber: string
  }
  status?: ReservationStatus
  notes?: string
}

export interface ReservationSearchParameters {
  userId?: string
  municipalityId?: string
  officeId?: string
  startDate?: string
  endDate?: string
}
