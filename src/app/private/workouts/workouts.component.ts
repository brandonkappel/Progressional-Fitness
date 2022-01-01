import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Workout } from './workout.model';
import { WorkoutsService } from './workouts.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts: Workout[]=[]

  isLoading = false;
  workoutsPerPage = 10;
  currentPage = 1;
  private workoutSub: Subscription;
  totalWorkouts = 0;
  public userIsAuthenticated = false
  private authStatusSub: Subscription
  userId: string;
  pageSizeOptions = [1, 2, 5, 10]





  constructor(private workoutService: WorkoutsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.workoutService.getWorkouts(this.workoutsPerPage, this.currentPage)
    this.workoutSub = this.workoutService.getWorkoutUpdatedListener()
      .subscribe((workoutData: { workouts: Workout[], workoutCount: number }) => {
        this.isLoading = false
        this.totalWorkouts = workoutData.workoutCount
        this.workouts = workoutData.workouts;
        console.error(this.workouts)
      });
      this.userIsAuthenticated = this.authService.getIsAuth()
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId()
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1;
    this.workoutsPerPage = pageData.pageSize;
    this.workoutService.getWorkouts(this.workoutsPerPage, this.currentPage);
  }

  onDelete(workoutId: string) {
    this.isLoading = true

    this.workoutService.deleteWorkout(workoutId).subscribe(()=>{
      this.workoutService.getWorkouts(this.workoutsPerPage, this.currentPage)
    });
  }

}
