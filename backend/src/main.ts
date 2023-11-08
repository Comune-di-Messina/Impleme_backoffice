import 'hammerjs'
import { enableProdMode, ViewEncapsulation } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

import { hmrBootstrap } from './hmr'

if (environment.production) {
  enableProdMode()
}

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href.replace(/\/$/, '')
}

const providers = [{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }]

const bootstrap = () => {
  return platformBrowserDynamic(providers)
    .bootstrapModule(AppModule, {
      defaultEncapsulation: ViewEncapsulation.Emulated,
      preserveWhitespaces: false,
    })
    .then(res => {
      if ((<any>window).appBootstrap) {
        ;(<any>window).appBootstrap()
      }
      return res
    })
}

bootstrap()
