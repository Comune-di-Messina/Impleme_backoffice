import { Office } from './office'

export enum DaysOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface TimeSlot {
  id: string
  office: Office
  dayOfWeek: DaysOfWeek
  startTime: string
  endTime: string
  date: Date
  reservable: boolean
}

export interface TimeSlotPayload {
  dayOfWeek?: DaysOfWeek
  startTime?: number[]
  endTime?: number[]
  date?: string
  reservable?: boolean
}

export interface TimeSlotMultiplePayload {
  startTime: number[]
  endTime: number[]
  days: DaysOfWeek[]
  serviceDuration: number
  contingency: number
}
