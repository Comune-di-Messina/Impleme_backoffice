import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaCostoFasciaComponent } from './tabella-costo-fascia.component';

describe('TabellaCostoFasciaComponent', () => {
  let component: TabellaCostoFasciaComponent;
  let fixture: ComponentFixture<TabellaCostoFasciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabellaCostoFasciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabellaCostoFasciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
