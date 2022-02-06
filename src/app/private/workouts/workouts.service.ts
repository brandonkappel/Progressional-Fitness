import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout,  } from './workout.model';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WorkoutItem } from './workoutitem.model';
import { identifierModuleUrl } from '@angular/compiler';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material/select';

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

  getWorkoutItems(id: string){
   return this.http.get<{message: string, workoutItem: any}>( 'http://localhost:3000/api/workoutItems' + id)
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

  getWorkoutI(id: string){
    return this.http.get( 'http://localhost:3000/api/workoutItems/' + id)
  }

  updateWorkout(id,workout, workoutItem ) {
    const w: Workout = {id: id , name: workout.name, date: workout.date, creator: null, client: null, program: null}
    this.http.put("http://localhost:3000/api/workouts/" + id, w)
      .subscribe(response => {
        console.error(response)
        console.error(workoutItem)
        let item = []
        // workoutItem.push({
        //   id: item.id
        //   name: item
        //   description:
        //   comments:
        //   workout:
        // })
        // this.router.navigate(["/workouts"])

      })
  }

  updateWorkoutItem(item){
    this.http.put( 'http://localhost:3000/api/workoutItems/'  + item.id, item)
  }

  addWorkout(workout, workoutItem ) {
    console.error(workout)
    // const workoutData = {name: name, date: date, user: user, program: program}
    // console.error(workoutData)
    this.http.post<{ message: string, workoutId: any }>('http://localhost:3000/api/workouts', workout)
      .subscribe((responseData) => {
        console.error('Workout:',responseData)
        let wItem = []
        workoutItem.forEach(item => {
          wItem.push({
            name: item.workoutItemName,
            description: item.description,
            comments: item.comments,
            workout: responseData.workoutId
          })
        })
        console.error('wItem', wItem)
        this.addWorkoutItem(wItem)

        // this.router.navigate(["/workouts"])
      });
  }

  addWorkoutItem (workoutItem){
    console.error('ADDED WORKOUT ITEM :', workoutItem)
    // const itemData = {name: name, description: description, comments: comments, workout: workout}
    // console.error(itemData)
    this.http.post<{message: string, workoutItemId: any}>('http://localhost:3000/api/workoutItems', workoutItem)
    .subscribe((response)=> {
      console.error('workout Item RETURN:',response)
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
      client: string;
      program: string}>("http://localhost:3000/api/workouts/" + id);
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
