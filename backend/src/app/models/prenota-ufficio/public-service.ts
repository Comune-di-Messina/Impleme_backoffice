export enum ReservationType {
  ADMINISTRATIVE = 'ADMINISTRATIVE',
  POLITICAL = 'POLITICAL',
}

export interface PublicService {
  id: string
  name: string
  description: string
  notes: string
  typeId: string
  labelField: string
  mandatoryField: boolean
  fieldNotes: string
  reservationType: ReservationType
}

export interface PublicServicePayload {
  name: string
  description: string
  notes: string
  typeId: string
  labelField: string
  mandatoryField: boolean
  fieldNotes: string
  reservationType: ReservationType
}

export interface PublicServiceSearchParameters {
  serviceTypeId?: string
  municipalityId?: string
  officeId?: string
}
