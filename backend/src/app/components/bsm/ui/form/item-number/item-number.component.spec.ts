import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNumberComponent } from './item-number.component';

describe('ItemNumberComponent', () => {
  let component: ItemNumberComponent;
  let fixture: ComponentFixture<ItemNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
