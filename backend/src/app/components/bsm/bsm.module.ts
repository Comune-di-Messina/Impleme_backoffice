import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { ItemInputComponent as BsmFormItemInput } from './ui/form/item-input/item-input.component'
import { ItemCheckboxComponent as BsmFormItemCheckbox } from './ui/form/item-checkbox/item-checkbox.component'
import { ItemNumberComponent as BsmFormItemNumber } from './ui/form/item-number/item-number.component'
import { ItemTimePickerComponent as BsmFormItemTimePicker } from './ui/form/item-time-picker/item-time-picker.component'
import { ItemSelectComponent as BsmFormItemSelect } from './ui/form/item-select/item-select.component'
import { ItemTextComponent as BsmFormItemTextComponent } from './ui/form/item-text/item-text.component'
import { NzAutoHeightTableDirective } from './ui/nz-auto-height-table/nz-auto-height-table.directive'
import { NzAutoHeightDivDirective } from './ui/nz-auto-height-div/nz-auto-height-div.directive'
import { BooleanPipe } from './pipes/boolean/boolean.pipe'
import { DateLocalizedPipe } from './pipes/date-localized/date-localized.pipe'
import { CurrencyLocalizedPipe } from './pipes/currency-localized/currency-localized.pipe'
import { PrenotazioneSalaDettaglioComponent } from './ui/prenotazione-sala-dettaglio/prenotazione-sala-dettaglio.component'
import { ItemDatePickerComponent as BsmFormItemDatePickerComponent } from './ui/form/item-date-picker/item-date-picker.component'

const PIPES = [BooleanPipe, DateLocalizedPipe, CurrencyLocalizedPipe]

const COMPONENTS = [
  BsmFormItemInput,
  BsmFormItemCheckbox,
  BsmFormItemNumber,
  BsmFormItemTimePicker,
  BsmFormItemSelect,
  BsmFormItemTextComponent,
  BsmFormItemDatePickerComponent,
  PrenotazioneSalaDettaglioComponent,
]

const DIRECTIVES = [NzAutoHeightTableDirective, NzAutoHeightDivDirective]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  exports: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
})
export class BsmModule {}
