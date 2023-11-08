import { User } from './user'
import { Institute } from './institute'
import { Sector, Subsector } from './sector'

export interface Reporting {
  id: number
  uuid: string
  title: string
  description: string
  insertTs: Date
  lastModTs: Date
  closedTs: Date
  address: string
  latitude: number
  longitude: number
  privacy: boolean
  instituteId: number
  sectorId: number
  subSectorId: number
  statusId: number
  insertById: number
  lastModById: number
  closedById: number
  type: string
  fileIdList: number[]
  publicNote: string
  privateNotes: string
  filePathList: string[]
  filesDTO: FileDTO[]
  assignedTo: User
  sectorDTO: Sector
  instituteDTO: Institute
  subSectorDTO: Subsector
  insertBy: User
  lastModBy: User
  closedBy: User
  reportingStep: ReportingStep[]
}

export interface ReportingStep {
  assignedToId: number
  closedTs: Date
  id: number
  insertTs: Date
  notePublic: string
  notePvt: string
  precedentStepId: number
}

export interface ReportingStatus {
  id: number
  value: string
}

export interface FileDTO {
  id: number
  uuid: string
  name: string
  type: string
  insertTs: Date
  contentContentType: string
  extension: string
  sizeKb: number
  path: string
}

export interface ReportingFile {
  description: string
  file: {
    absolute: boolean
    absolutePath: string
    canonicalPath: string
    directory: boolean
    file: boolean
    freeSpace: number
    hidden: boolean
    name: string
    parent: string
    path: string
    totalSpace: number
    usableSpace: number
  }
  filename: string
  inputStream: any
  open: boolean
  readable: boolean
  uri: {
    absolute: boolean
    authority: string
    fragment: string
    host: string
    opaque: boolean
    path: string
    port: number
    query: string
    rawAuthority: string
    rawFragment: string
    rawPath: string
    rawQuery: string
    rawSchemeSpecificPart: string
    rawUserInfo: string
    scheme: string
    schemeSpecificPart: string
    userInfo: string
  }
  url: {
    authority: string
    content: any
    defaultPort: number
    file: string
    host: string
    path: string
    port: number
    protocol: string
    query: string
    ref: string
    userInfo: string
  }
}
