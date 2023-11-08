import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ItemSelectComponent),
    multi: true
  }],

  selector: 'bsm-ui-form-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent implements OnInit, ControlValueAccessor {

  value : any = null;

  @Input() label: string = '';
  @Input() errorTip: string = '';
  @Input() required: boolean = false;
  @Input() options: any[];

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
  onChange: (value: number) => void = () => {};
  onTouched: Function = () => {};
  isDisabled = false;

  writeValue(value: number) {
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
