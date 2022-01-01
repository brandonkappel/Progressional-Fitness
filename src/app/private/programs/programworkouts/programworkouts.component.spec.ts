import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramworkoutsComponent } from './programworkouts.component';

describe('ProgramworkoutsComponent', () => {
  let component: ProgramworkoutsComponent;
  let fixture: ComponentFixture<ProgramworkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramworkoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramworkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
