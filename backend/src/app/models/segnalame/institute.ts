export interface Institute {
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
}

export interface InstituteSearchParameters {
  'email.contains'?: string
  'email.doesNotContain'?: string
  'email.equals'?: string
  'email.notEquals'?: string
  'email.in'?: string
  'email.notIn'?: string
  'email.specified'?: boolean
  'enabled.equals'?: boolean
  'enabled.in'?: boolean
  'enabled.notIn'?: boolean
  'enabled.notEquals'?: boolean
  'enabled.specified'?: boolean

  'id.equals'?: number
  'id.greaterThan'?: number
  'id.greaterThanOrEqual'?: number
  'id.in'?: number
  'id.lessThan'?: number
  'id.lessThanOrEqual'?: number
  'id.notEquals'?: number
  'id.notIn'?: number
  'id.specified'?: boolean

  'insertById.equals'?: number
  'insertById.greaterThan'?: number
  'insertById.greaterThanOrEqual'?: number
  'insertById.in'?: number
  'insertById.lessThan'?: number
  'insertById.lessThanOrEqual'?: number
  'insertById.notEquals'?: number
  'insertById.notIn'?: number
  'insertById.specified'?: boolean

  'insertTs.equals'?: Date
  'insertTs.greaterThan'?: Date
  'insertTs.greaterThanOrEqual'?: Date
  'insertTs.in[0].epochSecond'?: Date
  'insertTs.in[0].nano'?: Date
  'insertTs.lessThan'?: Date
  'insertTs.lessThanOrEqual'?: Date
  'insertTs.notEquals'?: Date
  'insertTs.notIn[0].epochSecond'?: Date
  'insertTs.notIn[0].nano'?: Date
  'insertTs.specified'?: boolean

  'lastModById.equals'?: number
  'lastModById.greaterThan'?: number
  'lastModById.greaterThanOrEqual'?: number
  'lastModById.in'?: number
  'lastModById.lessThan'?: number
  'lastModById.lessThanOrEqual'?: number
  'lastModById.notEquals'?: number
  'lastModById.notIn'?: number
  'lastModById.specified'?: boolean

  'lastModTs.equals'?: Date
  'lastModTs.greaterThan'?: Date
  'lastModTs.greaterThanOrEqual'?: Date
  'lastModTs.in[0].epochSecond'?: Date
  'lastModTs.in[0].nano'?: Date
  'lastModTs.lessThan'?: Date
  'lastModTs.lessThanOrEqual'?: Date
  'lastModTs.notEquals'?: Date
  'lastModTs.notIn[0].epochSecond'?: Date
  'lastModTs.notIn[0].nano'?: Date
  'lastModTs.specified'?: boolean

  'name.contains'?: string
  'name.doesNotContain'?: string
  'name.equals'?: string
  'name.in'?: string
  'name.notEquals'?: string
  'name.notIn'?: string
  'name.specified'?: boolean

  page?: number
  size?: number
  sort?: string

  'sectorId.equals'?: number
  'sectorId.greaterThan'?: number
  'sectorId.greaterThanOrEqual'?: number
  'sectorId.in'?: number
  'sectorId.lessThan'?: number
  'sectorId.lessThanOrEqual'?: number
  'sectorId.notEquals'?: number
  'sectorId.notIn'?: number
  'sectorId.specified'?: boolean

  'type.contains'?: string
  'type.doesNotContain'?: string
  'type.equals'?: string
  'type.in'?: string
  'type.notEquals'?: string
  'type.notIn'?: string
  'type.specified'?: boolean

  'uuid.contains'?: string
  'uuid.doesNotContain'?: string
  'uuid.equals'?: string
  'uuid.in'?: string
  'uuid.notEquals'?: string
  'uuid.notIn'?: string
  'uuid.specified'?: boolean
}
