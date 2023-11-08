export interface Sector {
  id: number
  uuid: string
  name: string
  email: string
  type: string
  enabled: boolean
  insertTs: Date
  lastModTs: Date
  insertById: number
  lastModById: number
  iconId: number
  imageId: number
  subtitle: string
  description: string
  iconPath: string
  imagePath: string
}

export interface Subsector {
  id: number
  uuid?: string
  name: string
  email: string
  type?: string
  enabled: boolean
  insertTs?: Date
  lastModTs?: Date
  insertById?: number
  lastModById?: number
  sectorId: number
  instituteId: number
}

export interface ImageModel {
  attachableClass: string
  attachableId: number
  contentContentType: string
  extension: string
  id: number
  insertTs: Date
  name: string
  sizeKb: number
  type: string
  uuid: string
}
