import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Workout } from '../workout.model';
import { WorkoutsService } from '../workouts.service';

@Component({
  selector: 'app-myworkouts',
  templateUrl: './myworkouts.component.html',
  styleUrls: ['./myworkouts.component.css']
})
export class MyworkoutsComponent implements OnInit {

  userId: string;
  workouts: any;
  workoutSub: Subscription;

  isLoading = false;
  workoutType: any;

  constructor(private authService: AuthService, private workoutService: WorkoutsService, private route: ActivatedRoute) {
    this.userId = this.authService.getUserId()
    // console.error(this.userId)
    this.route.queryParams.subscribe(param => {
      // console.error(param)
      this.workoutType = param.type
    })
   }

  ngOnInit(): void {

    this.isLoading = true

    if(this.workoutType == 'personal'){
      this.workoutService.getPersonalWorkouts(this.userId).subscribe(workouts => {

        this.workouts = workouts 
        this.isLoading = false
        console.error('PERSONAL WORKOUTS:', workouts)
      })
      
    } else {
      this.workoutService.getMyWorkouts(this.userId).subscribe(workouts => {
        this.workouts = workouts
        this.isLoading = false
        console.error(workouts)
      })
    }

   

  }


}
