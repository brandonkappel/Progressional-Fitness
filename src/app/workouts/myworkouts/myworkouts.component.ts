import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Client } from 'src/app/clients/clients.model';
import { Workout } from '../workout.model';
import { WorkoutsService } from '../workouts.service';

@Component({
  selector: 'app-myworkouts',
  templateUrl: './myworkouts.component.html',
  styleUrls: ['./myworkouts.component.css']
})
export class MyworkoutsComponent implements OnInit {

  userId: string;
  workouts: Workout[]=[];
  workoutSub: Subscription;

  constructor(private authService: AuthService, private workoutService: WorkoutsService) {
    this.userId = this.authService.getUserId()
    console.error(this.userId)
   }

  ngOnInit(): void {


    this.workoutService.getMyWorkouts(this.userId).subscribe(workouts => {
      console.error('My Workouts:',workouts)
    })

  }


}
