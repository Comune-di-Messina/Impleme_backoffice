import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

import { AuthService } from 'src/app/services/auth/auth.service'
import { ConfigService } from 'src/app/services/auth/config.service'

@Component({
  selector: 'cui-system-login',
  templateUrl: './login.component.html',
  styleUrls: ['../style.component.scss'],
})
export class LoginComponent implements OnInit {
  isAuthenticated: Observable<boolean>
  isDoneLoading: Observable<boolean>
  canActivateProtectedRoutes: Observable<boolean>
  showLoginForm: boolean

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private router: Router,
  ) {
    this.isAuthenticated = this.authService.isAuthenticated$
    this.isDoneLoading = this.authService.isDoneLoading$
    this.canActivateProtectedRoutes = this.authService.canActivateProtectedRoutes$
    this.showLoginForm = false

    this.authService.runInitialLoginSequence()
  }

  ngOnInit() {
    const fromUrl = this.router.parseUrl(this.router.url).queryParams.showForm
    this.showLoginForm = typeof fromUrl === 'undefined' ? true : fromUrl === 'true'
  }

  login() {
    this.authService.login()
  }

  logout() {
    this.authService.logout()
  }

  refresh() {
    this.authService.refresh()
  }

  reload() {
    window.location.reload()
  }

  clearStorage() {
    localStorage.clear()
  }

  logoutExternally() {
    window.open(this.authService.logoutUrl)
  }

  get authIdentity() {
    return this.configService.authUrl
  }

  get authAPI() {
    return this.configService.apiUrl
  }

  get clientId() {
    return this.configService.authConfig.clientId
  }

  get issuer() {
    return `${this.configService.authConfig.issuer}/.well-known/openid-configuration`
  }

  get hasValidToken() {
    return this.authService.hasValidToken()
  }

  get accessToken() {
    return this.authService.accessToken
  }

  get refreshToken() {
    return this.authService.refreshToken
  }

  get identityClaims() {
    return this.authService.identityClaims
  }

  get idToken() {
    return this.authService.idToken
  }
}
