import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabApertureComponent } from './tab-aperture.component';

describe('TabApertureComponent', () => {
  let component: TabApertureComponent;
  let fixture: ComponentFixture<TabApertureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabApertureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabApertureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
