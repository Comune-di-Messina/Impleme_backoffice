import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioneSalaDettaglioComponent } from './prenotazione-sala-dettaglio.component';

describe('PrenotazioneSalaDettaglioComponent', () => {
  let component: PrenotazioneSalaDettaglioComponent;
  let fixture: ComponentFixture<PrenotazioneSalaDettaglioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotazioneSalaDettaglioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazioneSalaDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
