export interface User {
  id: number
  login: string
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  activated: boolean
  langKey: string
  createdBy: string
  createdDate: Date
  lastModifiedBy: string
  lastModifiedDate: Date
  authorities: string[]
  sectors: number[]
}
