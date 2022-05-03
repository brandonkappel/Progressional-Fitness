import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Workout } from '../workout.model';
import { WorkoutsService } from '../workouts.service';

@Component({
  selector: 'app-workoutdisplay',
  templateUrl: './workoutdisplay.component.html',
  styleUrls: ['./workoutdisplay.component.css']
})
export class WorkoutdisplayComponent implements OnInit {

  workout: Workout
  public isLoading = false
  items: Object;

  constructor(
    private workoutService: WorkoutsService,
    public route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((ParamMap: ParamMap)=> {
      console.error(ParamMap)
      if (ParamMap.has('workoutId')){
        this.isLoading = true
        let workoutId = ParamMap.get('workoutId')
        this.workoutService.getWorkout(workoutId).subscribe(workout => {

          this.workout = {
            id: workout._id,
            name: workout.name,
            creator: workout.creator,
            client: workout.client,
            date: workout.date,
            program: workout.program
          }
          this.isLoading = false
          console.error(this.workout)
        })
        this.workoutService.getWorkoutI(workoutId).subscribe(item=> {
          console.error(item)
          this.items = item
        })
      }
    })
  }

  goBack(){
    this.location.back()
  }

}
