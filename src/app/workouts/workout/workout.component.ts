import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { subscribeOn } from 'rxjs/operators';
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
  items: FormArray;
  workoutForm: FormGroup;
  itemForm: FormGroup;
  formItem: FormArray;
  sectionAdded: boolean = false



  constructor( private workoutService: WorkoutsService, private formbuilder: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.workoutForm = this.formbuilder.group({
      workoutName: ['', Validators.required],
      date: [''],
    })

    // this.itemForm = this.formbuilder.group({
    //   item: this.formbuilder.array([this.newItem()])
    // })
    // this.workoutService.addWorkout(this.workoutForm.value.workoutName, this.workoutForm.value.date)


  }

  newItem(): FormGroup{
    return this.formbuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      comments: new FormControl('')
    })
  }

  addItem(){
   if ( this.itemForm.invalid){
     return
   }
    this.formItem = this.itemForm.get('item') as FormArray;
    this.formItem.push(this.newItem())
  }

  addItemSection(){
    if (this.workoutForm.invalid){
      return;
    }
    this.sectionAdded = true
  }

  getItem(): AbstractControl[]{
    // return (<FormArray> this.form.get('items')).controls
    return (this.itemForm.get('item') as FormArray).controls
  }

  removeItem(i: number){
    console.error(i)
    this.formItem.removeAt(i)

  }


  onSavePost() {
    console.error('form:', this.workoutForm.value)
    if (this.workoutForm.invalid) {
      console.error(this.workoutForm)
      return
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.workoutService.addWorkout(this.workoutForm.value.workoutName, this.workoutForm.value.date)
      // this.workoutService.addWorkoutItem(this.form.value.name, this.form.value.description, this.form.value.comments)
      this.snackBar.open("Successfully Created Post", "", { duration: 2000, verticalPosition: "top" })

    }
    // else {
    //   this.workoutService.updateUser(this.userId, this.form.value.firstName, this.form.value.lastName, this.form.value.email, this.form.value.role)
    // }

  }

}
