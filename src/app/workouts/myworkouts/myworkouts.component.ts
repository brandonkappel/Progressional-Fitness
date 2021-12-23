import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private workoutService: WorkoutsService) {
    this.userId = this.authService.getUserId()
    console.error(this.userId)
   }

  ngOnInit(): void {

    this.isLoading = true
    this.workoutService.getMyWorkouts(this.userId).subscribe(workouts => {
      this.workouts = workouts
      this.isLoading = false
      console.error(workouts)
    })

  }


}
