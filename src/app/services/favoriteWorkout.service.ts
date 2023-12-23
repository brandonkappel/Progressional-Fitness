import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Program,  } from '../private/programs/program.model';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const url = environment.apiUrl + "/favoriteWorkouts/"  


@Injectable({
  providedIn: 'root'
})
export class FavoriteWorkoutService {

  private programs: Program[] = []
  private programsUpdated = new Subject<{ programs: Program[] }>()


  constructor(private http: HttpClient, private router: Router) { }



  getfavoriteWorkouts(userId) {
  return this.http.get(url + userId)
  }



  updateProgram(id: string, ) {
    const program = this.programs
    console.error(program)
    this.http.put(url + id, program)
      .subscribe(response => {
        console.error(response)
        this.router.navigate(["/programs"])

      })
  }

  addfavoriteWorkout(user, workout ) {
    const post = {client: user, workout: workout}
   return  this.http.post(url, post)
  }




  deleteFavorite( userId, workoutId: string) {
    let post = {
      user: userId,
    }
    return this.http.put(url + workoutId, post)

  }


}
