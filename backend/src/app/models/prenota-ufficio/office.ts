export interface Office {
  id: string
  municipalityId: string
  name: string
  description: string
  coordinates: {
    longitude: number
    latitude: number
  }
  address: string
  telephoneNumber: string
  site: string
  email: string
  imageUrl: string
}

export interface OfficePayload {
  name: string
  description: string
  coordinates: {
    longitude: number
    latitude: number
  }
  address: string
  telephoneNumber: string
  site: string
  email: string
  imageUrl: string
}

export interface OfficesSearchParameters {
  municipalityId: string
  serviceType?: string
  serviceId?: string
}
