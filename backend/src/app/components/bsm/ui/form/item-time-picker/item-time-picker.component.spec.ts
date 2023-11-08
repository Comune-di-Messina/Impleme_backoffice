import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTimePickerComponent } from './item-time-picker.component';

describe('ItemTimePickerComponent', () => {
  let component: ItemTimePickerComponent;
  let fixture: ComponentFixture<ItemTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
