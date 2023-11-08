import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { ParamModel } from '../../../../models/segnalame/param-model'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManageParamsService {
  constructor(private http: HttpClient) {}

  getAllParams(params: HttpParams | QueryParams = null): Observable<ParamModel[]> {
    return this.http.get<ParamModel[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/params`,
      {
        headers: { authRequest: '' },
        params: params,
      },
    )
  }

  getParam(paramId: number): Observable<ParamModel> {
    return this.http.get<ParamModel>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/params/${paramId}`,
      { headers: { authRequest: '' } },
    )
  }

  updateParams(param: ParamModel): Observable<ParamModel> {
    return this.http.put<ParamModel>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/params`,
      param,
      { headers: { authRequest: '' } },
    )
  }
}
