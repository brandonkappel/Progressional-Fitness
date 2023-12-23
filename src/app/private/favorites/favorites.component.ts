import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteWorkoutService } from 'src/app/services/favoriteWorkout.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  public loaded = false
  userId: string;
  workouts

  constructor(
    private authService: AuthService, 
    private favoriteService: FavoriteWorkoutService) {
    this.userId = this.authService.getUserId()
    // console.error(this.userId)
 
  }

  ngOnInit(): void {
    this.favoriteService.getfavoriteWorkouts(this.userId).subscribe((fav:any)=> {
      if(fav) {
        this.workouts = fav.map(workout=> workout.workout )
        console.error(this.workouts)

      }
      this.loaded = true
    })


  }

}
