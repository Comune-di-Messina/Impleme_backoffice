import { Component, OnInit, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemCheckboxComponent),
      multi: true,
    },
  ],

  selector: 'bsm-ui-form-item-checkbox',
  templateUrl: './item-checkbox.component.html',
  styleUrls: ['./item-checkbox.component.scss'],
})
export class ItemCheckboxComponent implements OnInit, ControlValueAccessor {
  checked: boolean = false

  @Input() label: string = ''
  @Input() text: string = ''
  @Input() required: boolean = false

  constructor() {}

  ngOnInit(): void {}

  onChangeCheckbox($event: any) {
    this.checked = $event
    this.onChange(this.checked)
    this.onTouched()
  }

  /**
   * ControlValueAccessor
   */
  onChange: (value: boolean) => void = () => {}
  onTouched: Function = () => {}
  isDisabled = false

  writeValue(value: boolean) {
    this.checked = value
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled
  }
}
