import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout,  } from './workout.model';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WorkoutItem } from './workoutitem.model';
import { identifierModuleUrl } from '@angular/compiler';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material/select';
import { environment } from 'src/environments/environment';

const url = environment.apiUrl + "/workouts/"
const itemUrl = environment.apiUrl + "/workoutItems/"



@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  private workouts: Workout[] = []
  private workoutsUpdated = new Subject<{ workouts: Workout[], workoutCount: number }>()
  private workoutItems: WorkoutItem[]=[];


  constructor(private http: HttpClient, private router: Router) { }



  getWorkouts(workoutsPerPage: number, currentPage: number, type: string, client: string) {
    const queryParams = `?pagesize=${workoutsPerPage}&page=${currentPage}&type=${type}&client=${client}`;
    this.http.get<{ message: string, workouts: any, maxWorkouts: number }>(
      url + queryParams)
      .pipe(map((workoutData) => {
        // console.error(workoutData)
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
   return this.http.get<{message: string, workoutItem: any}>( itemUrl + id)
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
    return this.http.get( itemUrl + id)
  }

  updateWorkout(id,workout, workoutItem ) {
    const w: Workout = {id: id , name: workout.name, date: workout.date, creator: null, client: workout.client, program: workout.program}
    this.http.put(url + id, w)
      .subscribe(response => {
        console.error(response)
        console.error(workoutItem)
        let wItem = []
        if (workoutItem && workoutItem[0].id != ''){
        workoutItem.forEach(item => {
          wItem.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            comments: item.comments,
            workout: id
          })
        })
        console.error('wItem', wItem)
        wItem.forEach(item=> {
          let newItems = []
          let existingItems = []
          if(item._id == ''){
            delete item._id
            newItems.push(item)
            this.addWorkoutItem(newItems)
          } else {
            existingItems.push(item)
        this.updateWorkoutItem(existingItems)

          }
        })
      
      }

        
        // this.router.navigate(["/workouts"])

      })
  }

  updateWorkoutItem(item){
    console.error(item)
    this.http.put(itemUrl, item).subscribe(response =>{
      console.error('ITEM UPDATED', response)
    })
  }

  addWorkout(workout, workoutItem ) {
    console.error(workout)
    // const workoutData = {name: name, date: date, user: user, program: program}
    // console.error(workoutData)
    this.http.post<{ message: string, workoutId: any }>(url, workout)
      .subscribe((responseData) => {
        console.error('Workout:',responseData)
        let wItem = []
        workoutItem.forEach(item => {
          wItem.push({
            name: item.name,
            description: item.description,
            comments: item.comments,
            workout: responseData.workoutId
          })
        })
        console.error('wItem', wItem)
        this.addWorkoutItem(wItem)

        this.router.navigate(["/workouts"])
      });
  }

  addWorkoutItem (workoutItem){
    console.error('ADDED WORKOUT ITEM :', workoutItem)
    // const itemData = {name: name, description: description, comments: comments, workout: workout}
    // console.error(itemData)
    this.http.post<{message: string, workoutItemId: any}>(itemUrl, workoutItem)
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
      program: string}>(url + id);
  }

  getMyWorkouts(id: string) {
    return this.http.get<{
      _id: string;
      name: string
      date: Date;
      creator: string;
      client: string;}>(url+"/myWorkouts/" + id);
  }

  getPersonalWorkouts(id){
    return this.http.get(url+"/personalWorkouts/" + id);
  }

  getProgramWorkouts(id: string) {
    console.error('program id:', id)
    return this.http.get(url+"/programWorkouts/" + id);
  }

  deleteWorkout(workoutId: string) {
    return this.http.delete(url + workoutId)

  }

  deleteWorkoutItem(itemId: string){
    return this.http.delete(itemUrl + itemId)
  }


}
