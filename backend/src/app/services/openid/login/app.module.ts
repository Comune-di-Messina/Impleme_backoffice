import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { CoreModule } from '../../auth/core.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule.forRoot(), RouterModule.forRoot([])],
  providers: [],
  bootstrap: [AppComponent],
})
export class OpenIdLoginModule {}
