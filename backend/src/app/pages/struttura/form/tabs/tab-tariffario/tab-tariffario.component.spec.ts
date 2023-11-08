import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTariffarioComponent } from './tab-tariffario.component';

describe('TabTariffarioComponent', () => {
  let component: TabTariffarioComponent;
  let fixture: ComponentFixture<TabTariffarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabTariffarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTariffarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
