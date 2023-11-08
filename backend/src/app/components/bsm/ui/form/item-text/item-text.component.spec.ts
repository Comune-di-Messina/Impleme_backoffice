import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTextComponent } from './item-text.component';

describe('ItemTextComponent', () => {
  let component: ItemTextComponent;
  let fixture: ComponentFixture<ItemTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
