import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEventiComponent } from './tab-eventi.component';

describe('TabEventiComponent', () => {
  let component: TabEventiComponent;
  let fixture: ComponentFixture<TabEventiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEventiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
