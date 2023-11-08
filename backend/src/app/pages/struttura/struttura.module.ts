import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { StrutturaRouterModule } from './struttura-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'

// index
import { IndexComponent } from './index/index.component'
// tipologia/*
import * as Tipologia from './tipologia'
// categoria/*
import * as Categoria from './categoria'
import * as StrutturaCreateTabs from './form/tabs'

import { ReactiveFormsModule } from '@angular/forms'
import { FormComponent } from './form/index.component'
import { CreateComponent } from './create/index.component'
import { UpdateComponent } from './update/index.component'
import { PreviewComponent } from './details/index.component'
import { BsmModule } from 'src/app/components/bsm/bsm.module'
import { TabEventiComponent } from './form/tabs/tab-eventi/tab-eventi.component'
import { TabServiziComponent } from './form/tabs/tab-servizi/tab-servizi.component'
import { TabTariffarioComponent } from './form/tabs/tab-tariffario/tab-tariffario.component'
import { TabellaFasceComponent } from './form/tabs/tab-tariffario/tabella-fasce/tabella-fasce.component'
import { TabellaCostoFasciaComponent } from './form/tabs/tab-tariffario/tabella-costo-fascia/tabella-costo-fascia.component'
import { TabRestrizioniComponent } from './form/tabs/tab-restrizioni/tab-restrizioni.component'

const COMPONENTS = [
  IndexComponent,
  CreateComponent,
  UpdateComponent,
  PreviewComponent,
  FormComponent,
  Tipologia.IndexComponent,
  Tipologia.CreateComponent,
  Categoria.IndexComponent,
  Categoria.CreateComponent,
  StrutturaCreateTabs.TabInfoBase,
  StrutturaCreateTabs.TabAperture,
  StrutturaCreateTabs.TabEventi,
  StrutturaCreateTabs.TabServizi,
  StrutturaCreateTabs.TabTariffario,
  TabEventiComponent,
  TabServiziComponent,
  TabTariffarioComponent,
  TabellaFasceComponent,
  TabellaCostoFasciaComponent,
  TabRestrizioniComponent,
]

@NgModule({
  imports: [
    SharedModule,
    StrutturaRouterModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BsmModule,
  ],
  declarations: [...COMPONENTS],
})
export class StrutturaModule {}
