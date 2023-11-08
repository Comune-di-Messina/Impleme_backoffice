import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { AppPreloader } from 'src/app/app-routing-loader'
import { AuthGuard } from 'src/app/components/cleanui/system/Guard/auth.guard'

// layouts & notfound
import { LayoutAuthComponent } from 'src/app/layouts/Auth/auth.component'
import { LayoutMainComponent } from 'src/app/layouts/Main/main.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'user-tasks',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/user-tasks/user-tasks.module').then(m => m.UserTasksModule),
      },
      {
        path: 'prenotazione-sala',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/prenotazione-sala/prenotazione-sala.module').then(
            m => m.PrenotazioneSalaModule,
          ),
      },
      {
        path: 'bookings',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/bookings/bookings.module').then(m => m.BookingsModule),
      },
      {
        path: 'report-pagamenti',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/report-pagamenti/report-pagamenti.module').then(
            m => m.ReportPagamentiModule,
          ),
      },
      {
        path: 'tributi',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/tributi/tributi.module').then(m => m.TributiModule),
      },
      {
        path: 'tariffe',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/tariffe/tariffe.module').then(m => m.TariffeModule),
      },
      {
        path: 'attributi',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/attributi/attributi.module').then(m => m.AttributiModule),
      },
      {
        path: 'struttura',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/struttura/struttura.module').then(m => m.StrutturaModule),
      },

      {
        path: 'segnalame',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/segnalame/segnalame.module').then(m => m.SegnalameModule),
      },

      {
        path: 'prenota-ufficio',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/prenota-ufficio/prenota-ufficio.module').then(
            m => m.PrenotaUfficioModule,
          ),
      },

      {
        path: 'passi-carrabili',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/passi-carrabili/passi-carrabili.module').then(
            m => m.PassiCarrabiliModule,
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: LayoutAuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/auth/404',
  },
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: AppPreloader,
    }),
    LayoutsModule,
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule {}
