import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabServiziComponent } from './tab-servizi.component';

describe('TabServiziComponent', () => {
  let component: TabServiziComponent;
  let fixture: ComponentFixture<TabServiziComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabServiziComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabServiziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
