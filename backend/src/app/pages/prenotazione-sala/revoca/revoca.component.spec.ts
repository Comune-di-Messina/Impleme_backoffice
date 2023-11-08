import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevocaComponent } from './revoca.component';

describe('RevocaComponent', () => {
  let component: RevocaComponent;
  let fixture: ComponentFixture<RevocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
