import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaFasceComponent } from './tabella-fasce.component';

describe('TabellaFasceComponent', () => {
  let component: TabellaFasceComponent;
  let fixture: ComponentFixture<TabellaFasceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabellaFasceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabellaFasceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
