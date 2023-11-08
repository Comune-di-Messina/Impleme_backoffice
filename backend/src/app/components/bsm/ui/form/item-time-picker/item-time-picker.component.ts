import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ItemTimePickerComponent),
    multi: true
  }],

  selector: 'bsm-ui-form-item-time-picker',
  templateUrl: './item-time-picker.component.html',
  styleUrls: ['./item-time-picker.component.scss']
})
export class ItemTimePickerComponent implements OnInit, ControlValueAccessor {

  value : string = null;

  @Input() label: string = '';
  @Input() errorTip: string = '';
  @Input() required: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeValue(value) {
    this.value = value || 0;
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * ControlValueAccessor
   */
  onChange: (value: string) => void = () => {};
  onTouched: Function = () => {};
  isDisabled = false;

  writeValue(value: string) {
    this.value = value
  }
  
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  
  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled;
  }
}
