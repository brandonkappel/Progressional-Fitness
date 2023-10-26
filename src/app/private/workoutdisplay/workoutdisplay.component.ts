import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Workout } from '../../models/workout.model';
import { WorkoutsService } from '../../services/workouts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-workoutdisplay',
  templateUrl: './workoutdisplay.component.html',
  styleUrls: ['./workoutdisplay.component.css']
})
export class WorkoutdisplayComponent implements OnInit {

  workout: Workout 
  public isLoading = false
  workoutType: string;
  isUserAdmin: boolean = false;

  constructor(
    private workoutService: WorkoutsService,
    public route: ActivatedRoute,
    private location: Location,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.isUserAdmin = this.authService.getIsAdmin()


    this.route.paramMap.subscribe((ParamMap: ParamMap)=> {
      if (ParamMap.has('workoutId')){
        this.isLoading = true
        let workoutId = ParamMap.get('workoutId')
        this.workoutService.getWorkout(workoutId).subscribe((workout:any) => {
          this.workout = workout
          console.error('Workout:',this.workout)
          this.isLoading = false
          if(this.workout.personalWorkout == true){
            this.workoutType = 'personal'
          }
          if(this.workout.program != null) this.workoutType = 'program'
          console.error(this.workoutType)
        })
       
      }
    })

  }

  goBack(){
    this.location.back()
  }

  

}
