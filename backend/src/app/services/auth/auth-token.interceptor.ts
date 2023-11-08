import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.has('authRequest')) {
      let newHeaders = request.headers.delete('authRequest')
      if (this.authService.accessToken) {
        newHeaders = newHeaders.append('Authorization', `Bearer ${this.authService.accessToken}`)
      }
      if (this.authService.idToken) {
        newHeaders = newHeaders.append('X-Auth-Token', `${this.authService.idToken}`)
      }
      request = request.clone({ headers: newHeaders })
    }

    if (request.headers.has('x-ijt')) {
      const newHeaders = request.headers.delete('x-ijt')
      request = request.clone({ headers: newHeaders })
    }

    return next.handle(request)
  }
}
