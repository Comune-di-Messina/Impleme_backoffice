import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDatePickerComponent } from './item-date-picker.component';

describe('ItemDatePickerComponent', () => {
  let component: ItemDatePickerComponent;
  let fixture: ComponentFixture<ItemDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
