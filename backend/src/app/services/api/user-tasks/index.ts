import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import * as store from 'store'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
@Injectable()
export class UserTasksService {
  constructor(private http: HttpClient) {}

  demandableList(): Observable<any> {
    let params = new HttpParams()
    const headers = { authRequest: '' }
    return this.http
      .get(`${environment.API_USER_TASKS_URL_BASE}/tasks/demandable/list`, {
        params,
        headers,
      })
      .pipe(map(res => res))
    //.catch((error: any) => Observable.throw(error.json().status.message || 'Server error'));
  }

  assigneeList(): Observable<any> {
    let params = new HttpParams()
    const headers = { authRequest: '' }
    return this.http
      .get(`${environment.API_USER_TASKS_URL_BASE}/tasks/assignee/list`, {
        params,
        headers,
      })
      .pipe(map(res => res))
    //.catch((error: any) => Observable.throw(error.json().status.message || 'Server error'));
  }

  claim(key: string): Observable<any> {
    let params = new HttpParams()
    const headers = { authRequest: '' }
    return this.http
      .put(`${environment.API_USER_TASKS_URL_BASE}/tasks/${key}/claim`, null, {
        params,
        headers,
      })
      .pipe(map(res => res))
    //.catch((error: any) => Observable.throw(error.json().status.message || 'Server error'));
  }

  complete(key: string, evaluation: string, amount: number, message: string): Observable<any> {
    const headers = { authRequest: '' }
    const data = {
      evaluation,
      amount,
      message,
    }
    return this.http
      .put(`${environment.API_USER_TASKS_URL_BASE}/tasks/${key}/complete`, data, {
        headers,
      })
      .pipe(map(res => res))
    //.catch((error: any) => Observable.throw(error.json().status.message || 'Server error'));
  }

  view(key: string): Observable<any> {
    const headers = { authRequest: '' }
    return this.http
      .get(`${environment.API_USER_TASKS_URL_BASE}/tasks/${key}`, {
        headers,
      })
      .pipe(map(res => res))
    //.catch((error: any) => Observable.throw(error.json().status.message || 'Server error'));
  }
}
