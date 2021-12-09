import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkoutsService } from '../workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  private mode = 'create';



  constructor( private workoutService: WorkoutsService,) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "name": new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(3)]
      }),
      "date": new FormControl(null, {
        // validators: [Validators.required]
      }),
      // image: new FormControl(null, {
      //   validators: [Validators.required],
      //   asyncValidators: [mimeType]
      // })
      // "creator": new FormControl(null, {
      //   // validators: [Validators.required]
      // }),
      // "client": new FormControl(null, {
      //   // validators: [Validators.required]
      // }),

    });
  }

  onSavePost() {
    console.error('form:', this.form.value)
    if (this.form.invalid) {
      console.error(this.form)
      return
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.workoutService.addWorkout(this.form.value.name, this.form.value.date)

    }
    // else {
    //   this.workoutService.updateUser(this.userId, this.form.value.firstName, this.form.value.lastName, this.form.value.email, this.form.value.role)
    // }

  }

}
