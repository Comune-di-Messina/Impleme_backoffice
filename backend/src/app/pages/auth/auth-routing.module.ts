import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// system pages
import { LoginPage } from 'src/app/pages/auth/login/login.component'
import { Error500Page } from 'src/app/pages/auth/500/500.component'
import { Error404Page } from 'src/app/pages/auth/404/404.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/404',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
    data: { title: 'Login' },
  },
  {
    path: '404',
    component: Error404Page,
    data: { title: 'Error 404' },
  },
  {
    path: '500',
    component: Error500Page,
    data: { title: 'Error 500' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AuthRouterModule {}
