import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabInfoBaseComponent } from './tab-info-base.component';

describe('TabInfoBaseComponent', () => {
  let component: TabInfoBaseComponent;
  let fixture: ComponentFixture<TabInfoBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabInfoBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabInfoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
