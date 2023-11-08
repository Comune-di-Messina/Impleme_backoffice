import { Injectable, Inject } from '@angular/core'
import { AuthConfig } from 'angular-oauth2-oidc'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(@Inject('BASE_URL') public readonly originUrl: string) {}
  public readonly authUrl = environment.AUTH_URL
  public readonly apiUrl = ''
  public readonly autoLogin = false
  public readonly revokeTokenOnLogout = false

  // Auth config
  public authConfig: AuthConfig = {
    issuer: `${environment.AUTH_URL}/oauth2/oidcdiscovery`,
    redirectUri: `${window.location.origin}/auth/login`,
    postLogoutRedirectUri: `${window.location.origin}/auth/login`,
    clientId: environment.AUTH_CLIENT_ID,
    scope: environment.AUTH_SCOPE,
    skipIssuerCheck: true,
    strictDiscoveryDocumentValidation: false,
    responseType: environment.AUTH_RESPONSE_TYPE,
    disablePKCE: false,
    silentRefreshTimeout: 5000,
    timeoutFactor: 0.75,
    sessionChecksEnabled: false,
    showDebugInformation: true,
    clearHashAfterLogin: false,
    logoutUrl: `${window.location.origin}/auth/login`,
    tokenEndpoint: `${environment.AUTH_URL}/oauth2/token`,
  }
}
