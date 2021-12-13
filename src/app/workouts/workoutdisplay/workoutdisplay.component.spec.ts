import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutdisplayComponent } from './workoutdisplay.component';

describe('WorkoutdisplayComponent', () => {
  let component: WorkoutdisplayComponent;
  let fixture: ComponentFixture<WorkoutdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
