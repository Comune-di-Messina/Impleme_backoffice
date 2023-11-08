import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import * as store from 'store'
import { environment } from 'src/environments/environment'
import { AuthService } from '../../../auth/auth.service'

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  index(): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.get(`${environment.API_ROOMS_URL_BASE}/public/rooms/categories`, {
      params: body,
      headers: headers,
    })
  }

  create(model): Observable<any> {
    // const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.post(`${environment.API_ROOMS_URL_BASE}/rooms/categories`, model, {
      headers,
    })
  }

  delete(id): Observable<any> {
    // const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.delete(`${environment.API_ROOMS_URL_BASE}/rooms/categories/${id}`, {
      headers,
    })
  }
}
