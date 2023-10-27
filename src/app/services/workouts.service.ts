import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout, } from '../models/workout.model';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
// import { identifierModuleUrl } from '@angular/compiler';
// import { SELECT_ITEM_HEIGHT_EM } from '@angular/material/select';
import { environment } from 'src/environments/environment';

const url = environment.apiUrl + "/workouts/"
const itemUrl = environment.apiUrl + "/workoutItems/"



@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  private workouts: Workout[] = []
  private workoutsUpdated = new Subject<{ workouts: Workout[], workoutCount: number }>()
  // private workoutItems: WorkoutItem[] = [];


  constructor(private http: HttpClient, private router: Router) { }



  getWorkouts(workoutsPerPage: number, currentPage: number, search:any) {
    const queryParams = `?pagesize=${workoutsPerPage}&page=${currentPage}`;
    this.http.post<{ message: string, workouts: any, maxWorkouts: number }>(
      url + 'getWorkouts/' + queryParams,search)
      // .pipe(map((workoutData) => {
      //   // console.error(workoutData)
      //   return {
      //     workouts: workoutData.workouts.map(workout => {
      //       return {
      //         name: workout.name,
      //         date: workout.date,
      //         creator: workout.creator,
      //         client: workout.client,
      //         program: workout.program,
      //         id: workout._id
      //       };
      //     }), maxWorkouts: workoutData.maxWorkouts
      //   };
      // }))
      .subscribe((transformedWorkoutData) => {
        console.error(transformedWorkoutData)
        this.workouts = transformedWorkoutData.workouts;
        this.workoutsUpdated.next({ workouts: [...this.workouts], workoutCount: transformedWorkoutData.maxWorkouts });
      });
  }

  // getWorkouts(workoutsPerPage: number, currentPage: number, search: any,){

  //   console.error('check', search)
  //   const queryParams = `?pagesize=${workoutsPerPage}&page=${currentPage}`;
  //  return this.http.post<{ message: string, workouts: any, maxWorkouts: number }>(
  //     url + 'workouts' + queryParams, search)
  // }

  getWorkoutItems(id: string) {
    return this.http.get<{ message: string, workoutItem: any }>(itemUrl + id)
      .pipe(map((itemData) => {
        return {
          workoutItems: itemData.workoutItem.map(item => {
            return {
              name: item.name,
              description: item.description,
              comments: item.comments,
            }
          })
        }
      })).subscribe((transformedItemData) => {
        // this.workoutItems = transformedItemData.workoutItems;
      })
  }

  getWorkoutI(id: string) {
    return this.http.get(itemUrl + id)
  }

  updateWorkout(id, workout, workoutType) { 
    console.error('w:',workout)
    // const w: Workout = { 
    //   id: id, name: workout.name, 
    //   date: workout.date, 
    //   creator: null, 
    //   client: workout.client, 
    //   program: workout.program, 
    //   personalWorkout: workout.personalWorkout,
    //   workoutItems: workout.workoutItems 
    // }
   
    this.http.put(url + id, workout)
      .subscribe((response:any) => {
        console.error(response)
       
       
        if (workoutType == 'personal') {
          this.router.navigate(['/private/workoutDisplay/' + response.workoutId], { queryParams: { type: 'personal' } })
        } else {
          this.router.navigate(["private/workouts"])

        }
      })
  }

  updateWorkoutItem(item) {
    // console.error(item)
    this.http.put(itemUrl, item).subscribe(response => {
      // console.error('ITEM UPDATED', response)
    })
  }

  addWorkout(workout, workoutType) {
    console.error(workout)
    // return
    // console.error(workoutData)
    this.http.post<{ message: string, workoutId: any }>(url + 'workouts', workout)
      .subscribe((responseData) => {
        console.error('Workout:', responseData)
      
        // console.error('wItem', wItem)
        // this.addWorkoutItem(wItem)
        if (workoutType == 'personal') {
          this.router.navigate(['/private/myworkouts'], { queryParams: { type: 'personal' } })
        } else {
          this.router.navigate(["/private/workouts"])

        }
      });
  }

  addWorkoutItem(workoutItem) {
    // console.error('ADDED WORKOUT ITEM :', workoutItem)
    // const itemData = {name: name, description: description, comments: comments, workout: workout}
    // console.error(itemData)
    this.http.post<{ message: string, workoutItemId: any }>(itemUrl, workoutItem)
      .subscribe((response) => {
        // console.error('workout Item RETURN:', response)
      })
  }



  getWorkoutUpdatedListener() {
    return this.workoutsUpdated.asObservable();
  }

  getWorkout(id: string) {
    return this.http.get<{
      // _id: string;
      // name: string
      // date: Date;
      // creator: string;
      // client: string;
      // program: string;
      // workoutItems: Array<any>
    }>(url + id);
  }

  getMyWorkouts(id: string, dateStart, dateEnd) {
    const queryParams = `?dateStart=${dateStart}&dateEnd=${dateEnd}`;

    // console.error(id)
    return this.http.get<{
      _id: string;
      name: string
      date: Date;
      creator: string;
      client: string;
    }>(url + "myWorkouts/" + id + queryParams);3
  }

  getPersonalTrainingWorkouts(id, dateStart, dateEnd) {
    const queryParams = `?dateStart=${dateStart}&dateEnd=${dateEnd}`;
    return this.http.get(url + "personalTrainingWorkouts/" + id + queryParams );
  }

  getProgramWorkouts(id: string) {
    // console.error('program id:', id)
    return this.http.get(url + "programWorkouts/" + id);
  }

  deleteWorkout(workoutId: string) {
    return this.http.delete(url + workoutId)
  }

  deleteWorkoutItem(itemId: string) {
    return this.http.delete(itemUrl + itemId)
  }


}
