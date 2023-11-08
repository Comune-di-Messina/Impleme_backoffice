import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ItemTextComponent),
    multi: true
  }],

  selector: 'bsm-ui-form-item-text',
  templateUrl: './item-text.component.html',
  styleUrls: ['./item-text.component.scss']
})
export class ItemTextComponent implements OnInit, ControlValueAccessor {

  text : string = '';

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errorTip: string = '';
  @Input() required: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onInputText($event: any) {
    this.text = $event.target.value;
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
