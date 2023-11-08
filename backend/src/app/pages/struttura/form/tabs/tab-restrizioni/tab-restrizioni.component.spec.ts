import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRestrizioniComponent } from './tab-restrizioni.component';

describe('TabRestrizioniComponent', () => {
  let component: TabRestrizioniComponent;
  let fixture: ComponentFixture<TabRestrizioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabRestrizioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRestrizioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
