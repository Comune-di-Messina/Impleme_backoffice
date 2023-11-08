import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from './store/reducers'
import { UserEffects } from './store/user/effects'
import { AuthTokenInterceptor } from './services/auth/auth-token.interceptor'
import { RoomBookingBookingsService } from './services/api/room-bookings'
import * as ApiService from './services/api'

// locale resistration
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { NZ_I18N, en_US as localeZorro } from 'ng-zorro-antd'

import { ApiEffects } from './store/api/effects'

import { TributiService } from './services/api/tributi/tributi'
import { TariffeService } from './services/api/tributi/tariffe'
import { AttributiService } from './services/api/tributi/attributi'
import { ACLService } from './services/acl'

import { OpenIdLoginModule } from './services/openid/login/app.module'
import { BookingEffects } from './store/bookings/effects'
import { BookingsService } from './services/bookings/BookingsService'
import { RoomsEffects } from './store/rooms/effects'
import { MunicipalitiesEffects } from './store/municipalities/effects'
import { MunicipalitiesService } from './services/municipalities/MunicipalitiesService'
import { RoomsService } from './services/rooms'
import { ZeeBeeUserTasksService } from './services/ZeeBee/user-controller'
import { ZeeBeeUserTasksEffects } from './store/user-tasks/effects'

registerLocaleData(localeEn, 'it')

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    OpenIdLoginModule,

    // translate
    TranslateModule.forRoot(),

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      UserEffects,
      ApiEffects,
      BookingEffects,
      RoomsEffects,
      MunicipalitiesEffects,
      ZeeBeeUserTasksEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),

    // nprogress
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,

    // Init pipes
  ],
  providers: [
    // auth services
    ACLService,

    // api services
    RoomBookingBookingsService,
    TributiService,
    TariffeService,
    AttributiService,
    ApiService.RoomsTypologiesService,
    ApiService.RoomsCategoriesService,
    ApiService.RoomsService,
    ApiService.UserTasksService,
    ApiService.EntiService,
    ApiService.PagomeService,
    ApiService.ReservationsService,
    BookingsService,
    RoomsService,
    MunicipalitiesService,
    ZeeBeeUserTasksService,

    // Auth Token interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },

    // locale providers
    { provide: LOCALE_ID, useValue: 'it' },
    { provide: NZ_I18N, useValue: localeZorro },

    // firestore settings
    { provide: SETTINGS, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
