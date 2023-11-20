import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  workout: any
  public isLoading = false
  workoutType: string;
  isUserAdmin: boolean = false;
  addResult:any = {}
  addingResult: boolean = false;
  newResult:any = {
    comment: '',
    date: new Date()
  }

  constructor(
    private workoutService: WorkoutsService,
    public route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private change: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    // console.error(this.addResult)
    this.isUserAdmin = this.authService.getIsAdmin()


    this.route.paramMap.subscribe((ParamMap: ParamMap)=> {
      if (ParamMap.has('workoutId')){
        this.isLoading = true
        let workoutId = ParamMap.get('workoutId')
        this.workoutService.getWorkout(workoutId).subscribe((workout:any) => {
          console.error('Workout:',workout)

          this.workout = workout.workout
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

  addRes(workoutItem, i){
  // console.error(workout)
  workoutItem.workoutResults.push(this.newResult)
  // console.error(workout)
  this.newResult.workout = workoutItem._id
  this.addResult[i] = !this.addResult[i]
  this.workoutService.addResult( this.newResult).subscribe(res=> {
    console.error(res)
     this.newResult = {
    date: new Date(),
    comment: ''
  }
  })
 
  }

  addFavorite(){
    this.workout.favorite == true ? this.workout.favorite = false : this.workout.favorite = true
    this.workoutService.addFavorite(this.workout._id, {favorite:this.workout.favorite}).subscribe(res=> {
      console.error(res)
    })
  }

  cancelRes(){
    this.addingResult = false
  }

  goBack(){
    this.location.back()
  }

  

}
