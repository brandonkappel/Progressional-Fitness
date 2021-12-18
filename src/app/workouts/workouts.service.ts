import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout,  } from './workout.model';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WorkoutItem } from './workoutitem.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  private workouts: Workout[] = []
  private workoutsUpdated = new Subject<{ workouts: Workout[], workoutCount: number }>()
  private workoutItems: WorkoutItem[]=[];


  constructor(private http: HttpClient, private router: Router) { }



  getWorkouts(workoutsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${workoutsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, workouts: any, maxWorkouts: number }>(
      'http://localhost:3000/api/workouts' + queryParams)
      .pipe(map((workoutData) => {
        return {
          workouts: workoutData.workouts.map(workout => {
            return {
              name: workout.name,
              date: workout.date,
              creator: workout.creator,
              client: workout.client,
              program: workout.program,
              id: workout._id
            };
          }), maxWorkouts: workoutData.maxWorkouts
        };
      }))
      .subscribe((transformedWorkoutData) => {
        this.workouts = transformedWorkoutData.workouts;
        this.workoutsUpdated.next({ workouts: [...this.workouts], workoutCount: transformedWorkoutData.maxWorkouts });
      });
  }

  getWorkoutItems(){
    this.http.get<{message: string, workoutItem: any}>( 'http://localhost:3000/api/workoutItems')
    .pipe(map((itemData)=> {
      return {
        workoutItems: itemData.workoutItem.map(item => {
          return {
            name: item.name,
            description: item.description,
            comments: item.comments,
          }
        })
      }
    })). subscribe((transformedItemData)=> {
      this.workoutItems = transformedItemData.workoutItems;
    })
  }

  updateWorkout(id: string, ) {
    const workout = this.workouts
    console.error(workout)
    this.http.put("http://localhost:3000/api/workouts/" + id, workout)
      .subscribe(response => {
        console.error(response)
        this.router.navigate(["/workouts"])

      })
  }

  addWorkout(name: string, date: Date, user: string, program: string ) {
    // console.error(workout)
    const workoutData = {name: name, date: date, user: user, program: program}
    // console.error(workoutData)
    this.http.post<{ message: string, workoutId: any }>('http://localhost:3000/api/workouts', workoutData)
      .subscribe((responseData) => {
        console.error('Workout:',responseData)
        this.router.navigate(["/workouts"])
      });
  }

  addWorkoutItem (name: string, description: string, comments: string ){
    const itemData = {name: name, description: description, comments: comments}
    console.error(itemData)
    this.http.post<{message: string, workoutItemId: any}>('http://localhost:3000/api/workoutItems', itemData)
    .subscribe((response)=> {
      console.error('workout Item:',response)
    })
  }

  getWorkoutUpdatedListener() {
    return this.workoutsUpdated.asObservable();
  }

  getWorkout(id: string) {
    return this.http.get<{
      _id: string;
      name: string
      date: Date;
      creator: string;
      client: string;}>("http://localhost:3000/api/workouts/" + id);
  }

  getMyWorkouts(id: string) {
    return this.http.get<{
      _id: string;
      name: string
      date: Date;
      creator: string;
      client: string;}>("http://localhost:3000/api/workouts/myWorkouts/" + id);
  }

  getProgramWorkouts(id: string) {
    console.error('program id:', id)
    return this.http.get("http://localhost:3000/api/workouts/programWorkouts/" + id);
  }

  deleteWorkout(workoutId: string) {
    return this.http.delete("http://localhost:3000/api/workouts/" + workoutId)

  }


}
