import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTrainingComponent } from './personal-training.component';

describe('PersonalTrainingComponent', () => {
  let component: PersonalTrainingComponent;
  let fixture: ComponentFixture<PersonalTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
