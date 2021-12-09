import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout,  } from './workout.model';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  private workouts: Workout[] = []
  private workoutsUpdated = new Subject<{ workouts: Workout[], workoutCount: number }>()


  constructor(private http: HttpClient, private router: Router) { }



  getWorkouts(workoutsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${workoutsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, workouts: any, maxWorkouts: number }>(
      'http://localhost:3000/api/workout' + queryParams)
      .pipe(map((WorkoutData) => {
        return {
          workouts: WorkoutData.workouts.map(user => {
            return {
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              email: user.email,
              id: user._id,
              creator: user.creator
            };
          }), maxWorkouts: WorkoutData.maxWorkouts
        };
      }))
      .subscribe((transformedWorkoutData) => {
        this.workouts = transformedWorkoutData.workouts;
        this.workoutsUpdated.next({ workouts: [...this.workouts], workoutCount: transformedWorkoutData.maxWorkouts });
      });
  }

  updateUser(id: string, ) {
    const workout = this.workouts
    console.error(workout)
    this.http.put("http://localhost:3000/api/user/" + id, workout)
      .subscribe(response => {
        console.error(response)
        this.router.navigate(["/clients"])

      })
  }

  addWorkout(name: string, date: Date, ) {
    // console.error(workout)
    const workoutData = {name: name, date: date}

    this.http.post<{ message: string, workoutId: any }>('http://localhost:3000/api/workouts', workoutData)
      .subscribe((responseData) => {
        console.error(responseData)
        this.router.navigate(["/"])
      });

  }

  getWorkoutUpdatedListener() {
    return this.workoutsUpdated.asObservable();
  }
  getWorkout(id: string) {
    return this.http.get("http://localhost:3000/api/user/" + id);
  }

  deletePost(userId: string) {
    return this.http.delete("http://localhost:3000/api/user/" + userId)

  }


}
