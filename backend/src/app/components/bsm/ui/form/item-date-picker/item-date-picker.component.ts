import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ItemDatePickerComponent),
    multi: true
  }],

  selector: 'bsm-ui-form-item-date-picker',
  templateUrl: './item-date-picker.component.html',
  styleUrls: ['./item-date-picker.component.scss']
})
export class ItemDatePickerComponent implements OnInit, ControlValueAccessor {

  text : string = '';

  @Input() label: string = '';
  @Input() errorTip: string = '';
  @Input() format: string = 'dd/MM/yyyy';
  @Input() required: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeDate($event: any) {
    this.text = $event;
    this.onChange(this.text);
    this.onTouched();
  }

  /**
   * ControlValueAccessor
   */
  onChange: (value: string) => void = () => {};
  onTouched: Function = () => {};
  isDisabled = false;

  writeValue(value: string) {
    this.text = value || ''
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
