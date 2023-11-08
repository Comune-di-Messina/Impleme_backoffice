import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap, mergeMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import {
  Pratica,
  PraticheSearchParameters,
  TipologiaPratica,
  Allegato,
  TaskDomain,
} from 'src/app/models/passi-carrabili/pratiche'

export interface QueryParams {
  [key: string]: string | string[]
}

export interface CompleteTaskPayload {
  [key: string]: any
}

export enum WebhookActions {
  create = 'create',
  update = 'update',
  delete = 'delete',
}

@Injectable({
  providedIn: 'root',
})
export class ManagePraticheService {
  constructor(private http: HttpClient) {}

  /**
   * Get Pratiche
   * @param {PraticheSearchParameters} searchParams
   * @returns {Pratica[]} Pratica[]
   */
  getCaseFiles(searchParams?: PraticheSearchParameters): Observable<Pratica[]> {
    return this.http.get<Pratica[]>(`${environment.API_ROOMS_URL_BASE}/casefiles`, {
      params: searchParams ? this.sanitazeQueryParams(searchParams) : null,
      headers: { authRequest: '' },
    })
  }

  /**
   * Get Pratica
   * @param {string} praticaId
   * @returns {Pratica} Pratica
   */
  getCaseFile(praticaId: string): Observable<Pratica> {
    return this.http.get<Pratica>(`${environment.API_ROOMS_URL_BASE}/casefiles/${praticaId}`, {
      headers: { authRequest: '' },
    })
    // .pipe(
    //   map(reporting => {
    //     return ManageReportingsService.modifyReporting(reporting)
    //   }),
    // )
  }

  /**
   * Get Documenti Pratica
   * @param {string} praticaId
   * @returns {Allegato} Allegato
   */
  getCasefileDocuments(praticaId: string): Observable<Allegato[]> {
    return this.http.get<Allegato[]>(
      `${environment.API_ROOMS_URL_BASE}/casefiles/${praticaId}/documents`,
      {
        // params: searchParams ? this.sanitazeQueryParams(searchParams) : null,
        headers: { authRequest: '' },
      },
    )
  }

  /**
   * Tipologie Pratiche
   * @returns {TipologiaPratica[]} TipologiaPratica[]
   */
  getTypes(): Observable<TipologiaPratica[]> {
    return this.http.get<TipologiaPratica[]>(`${environment.API_ROOMS_URL_BASE}/public/types`, {
      // params: searchParams ? this.sanitazeQueryParams(searchParams) : null,
      headers: { authRequest: '' },
    })
  }

  /**
   * Create Tipologia
   * @param {TipologiaPratica} model
   * @returns {TipologiaPratica} TipologiaPratica
   */
  createType(model: TipologiaPratica): Observable<TipologiaPratica> {
    return this.http
      .post<TipologiaPratica>(`${environment.API_ROOMS_URL_BASE}/types`, model, {
        headers: { authRequest: '' },
      })
      .pipe(
        tap(response => {
          this.sendWebhookType(response.id, WebhookActions.create).toPromise()
        }),
      )
  }

  /**
   * Edit Tipologia
   * @param {TipologiaPratica} model
   * @returns {TipologiaPratica} TipologiaPratica
   */
  editType(model: TipologiaPratica): Observable<TipologiaPratica> {
    return this.http
      .put<TipologiaPratica>(`${environment.API_ROOMS_URL_BASE}/types/${model.id}`, model, {
        headers: { authRequest: '' },
      })
      .pipe(
        tap(response => {
          this.sendWebhookType(model.id, WebhookActions.update).toPromise()
        }),
      )
  }

  /**
   * Delete Tipologia
   * @param {string} tipologiaId
   * @returns any
   */
  deleteType(tipologiaId: string): Observable<any> {
    return this.http
      .delete(`${environment.API_ROOMS_URL_BASE}/types/${tipologiaId}`, {
        headers: { authRequest: '' },
      })
      .pipe(
        tap(response => {
          this.sendWebhookType(tipologiaId, WebhookActions.delete).toPromise()
        }),
      )
  }

  /**
   * Elenco task assegnati
   * @returns {TaskDomain[]} TaskDomain[]
   */
  getAssigneeList(): Observable<TaskDomain[]> {
    return this.http
      .get<TaskDomain[]>(`${environment.API_USER_TASKS_URL_BASE}/tasks/assignee/list`, {
        headers: { authRequest: '' },
      })
      .pipe(
        map(reportings => {
          return reportings.map((reporting: any, i: number) => {
            return {
              ...reporting,
              jsonSchema: reporting.jsonSchema ? JSON.parse(reporting.jsonSchema) : null,
              variables: reporting.variables ? JSON.parse(reporting.variables) : null,
            }
          })
        }),
      )
  }

  /**
   * Elenco task assegnabili
   * @returns {TaskDomain[]} TaskDomain[]
   */
  getDemandableList(): Observable<TaskDomain[]> {
    return this.http
      .get<TaskDomain[]>(`${environment.API_USER_TASKS_URL_BASE}/tasks/demandable/list`, {
        headers: { authRequest: '' },
      })
      .pipe(
        map(reportings => {
          return reportings.map((reporting: any, i: number) => {
            return {
              ...reporting,
              jsonSchema: reporting.jsonSchema ? JSON.parse(reporting.jsonSchema) : null,
              variables: reporting.variables ? JSON.parse(reporting.variables) : null,
            }
          })
        }),
      )
  }

  /**
   * Assign Task
   * @param {number} key
   * @returns any
   */
  assignTask(key: number): Observable<any> {
    return this.http.put<any>(
      `${environment.API_USER_TASKS_URL_BASE}/tasks/${key}/claim`,
      {},
      {
        headers: { authRequest: '' },
      },
    )
  }

  /**
   * Complete Task
   * @param {number} key Task key
   * @returns any
   */
  completeTask(key: number, payload: CompleteTaskPayload): Observable<any> {
    const data: CompleteTaskPayload = {
      evaluation: null,
      message: null,
    }

    return this.http.put<any>(
      `${environment.API_USER_TASKS_URL_BASE}/tasks/${key}/complete`,
      payload,
      {
        headers: { authRequest: '' },
      },
    )
  }

  sendWebhookType(key: string, action: WebhookActions) {
    return this.http.get(
      `${environment.API_SEGNALAME_URL_DRUPAL}/casefiles/crud/${key}/${action}`,
      {
        headers: {
          'x-pdm-token': environment.API_SEGNALAME_AUTH_DRUPAL,
        },
      },
    )
  }

  /**
   * Sanitize query params and remove empty
   * @param params Params to sanitize
   * @returns
   */
  private sanitazeQueryParams(params: any): QueryParams {
    return Object.keys(params).reduce((acc, item) => {
      if (params[item] === null || params[item] === undefined) {
        return acc
      }

      return {
        ...acc,
        [item]: String(params[item]),
      }
    }, {})
  }
}
