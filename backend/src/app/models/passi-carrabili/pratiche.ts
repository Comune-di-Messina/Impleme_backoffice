export enum PassiCarrabiliStatus {
  RICHIESTA_PAGAMENTO = 1,
  RICHIESTA_DOCUMENTAZIONE = 2,
  INSERITA = 3,
  IN_LAVORAZIONE = 4,
  VALIDATA = 5,
  RESPINTA = 6,
  ANNULLATA = 7,
  REVOCATA = 9,
}

export interface Pratica {
  causale: string
  note: string
  importo: number
  idCaseFile: string
  details: object
  richiedente: Richiedente
  state: number
  ente: string
  tipologia: string
  tributo: string
  rata: string
  attachments: Allegato[] | null
}

export interface Richiedente {
  ragioneSociale: string | null
  name: string | null
  surname: string | null
  codiFisc: string | null
  piva: string | null
  email: string | null
  telephoneNumber: string | null
  indirizzo: Indirizzo
  dataNascita: string | null
  luogoNascita: string | null
  flagOrganizzatore: boolean
  flagEnte: boolean
}

export interface Indirizzo {
  stato: string | null
  provincia: string
  comune: string
  indirizzo: string
  civico: string | null
  cap: string | null
}

export interface Allegato {
  idDocumentale: string
  fileName: string
  description: string
}

export interface PraticheSearchParameters {
  codiFisc?: string
  start?: string
  end?: string
  stato?: number
}

export interface TipologiaPratica {
  id?: string
  codice: string
  nome: string
  descrizione: string | null
  importo: number
  img: string | null
  libero: string | null
  note: string | null
}

export interface TaskDomain {
  assignee: string
  assignmentTime: Date
  candidateGroups: string
  candidateUsers: string
  creationTime: Date
  description: string | null
  formFields: string | null
  jsonSchema: JsonSchema
  key: number
  name: string
  variables: any
  visibility: string | null
  workflowInstanceKey: number
}

export interface JsonSchema {
  $schema: string | null
  title: string | null
  description: string | null
  type: object | null
  properties: {
    [key: string]: {
      description: string
      type?: 'string' | 'number'
      enum?: any[]
      [key: string]: any
    }
  }
  required?: string[]
  dependencies?: { [key: string]: any }
  oneOf?: Array<{ [key: string]: any }>
}

export const getStatusName = (statusId: number): string => {
  switch (statusId) {
    case PassiCarrabiliStatus.RICHIESTA_PAGAMENTO:
      return 'Richiesta pagamento'
    case PassiCarrabiliStatus.RICHIESTA_DOCUMENTAZIONE:
      return 'Richiesta documentazione'
    case PassiCarrabiliStatus.INSERITA:
      return 'Inserita'
    case PassiCarrabiliStatus.IN_LAVORAZIONE:
      return 'In lavorazione'
    case PassiCarrabiliStatus.VALIDATA:
      return 'Validata'
    case PassiCarrabiliStatus.RESPINTA:
      return 'Respinta'
    case PassiCarrabiliStatus.ANNULLATA:
      return 'Annullata'
    case PassiCarrabiliStatus.REVOCATA:
      return 'Revocata'

    default:
      return ''
  }
}

export const getStatusColor = (statusId: number): string => {
  switch (statusId) {
    case PassiCarrabiliStatus.RICHIESTA_PAGAMENTO:
      return 'cyan'
    case PassiCarrabiliStatus.RICHIESTA_DOCUMENTAZIONE:
      return 'cyan'
    case PassiCarrabiliStatus.INSERITA:
      return 'blue'
    case PassiCarrabiliStatus.IN_LAVORAZIONE:
      return 'green'
    case PassiCarrabiliStatus.VALIDATA:
      return 'green'
    case PassiCarrabiliStatus.RESPINTA:
      return 'red'
    case PassiCarrabiliStatus.ANNULLATA:
      return 'volcano'
    case PassiCarrabiliStatus.REVOCATA:
      return 'red'

    default:
      return 'blue'
  }
}
