import { PublicService } from './public-service'

export interface Counter {
  id: string
  number: string
  officeId: string
  publicService: PublicService[]
}

export interface CounterPayload {
  number: string
  publicServiceId: string[]
}
