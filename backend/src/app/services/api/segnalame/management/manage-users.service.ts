import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { User } from '../../../../models/segnalame/user'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManageUsersService {
  constructor(private http: HttpClient) {}

  getUsers(page: number = 0, size: number = 15): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/users?page=${page}&size=${size}`,
      { headers: { authRequest: '' } },
    )
  }

  searchUsers(params: HttpParams | QueryParams): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/users/search`,
      {
        headers: { authRequest: '' },
        params: params,
      },
    )
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/users/${userId}`,
      { headers: { authRequest: '' } },
    )
  }

  editUser(user: any): Observable<User> {
    return this.http.put<User>(`${environment.API_SEGNALAME_URL_BASE}/api/management/users`, user, {
      headers: { authRequest: '' },
    })
  }

  userAssignSectors(userId: number, sectors: number[]): Observable<User> {
    return this.http.patch<User>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/users/${userId}/assign-sectors`,
      sectors,
      { headers: { authRequest: '' } },
    )
  }

  userRemoveSectors(userId: number, sectors: number[]): Observable<User> {
    return this.http.patch<User>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/users/${userId}/remove-sectors`,
      sectors,
      { headers: { authRequest: '' } },
    )
  }
}
