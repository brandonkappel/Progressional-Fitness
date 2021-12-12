import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyworkoutsComponent } from './myworkouts.component';

describe('MyworkoutsComponent', () => {
  let component: MyworkoutsComponent;
  let fixture: ComponentFixture<MyworkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyworkoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyworkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
