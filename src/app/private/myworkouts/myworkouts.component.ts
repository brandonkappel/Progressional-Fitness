import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Workout } from '../../models/workout.model';
import { WorkoutsService } from '../../services/workouts.service';

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
  workoutType: any;

  date = new Date();
  dateStart
  dateEnd
  dates: Date[];


  filterType: String 

  constructor(
    private authService: AuthService, 
    private workoutService: WorkoutsService, 
    private route: ActivatedRoute) {
    this.userId = this.authService.getUserId()
    // console.error(this.userId)
 
  }

  ngOnInit(): void {
    this.filterType = this.workoutService.myWorkoutFilter
    if(this.filterType == 'all'){
      this.dateStart = "",
      this.dateEnd = ""
      this.getData()
    } else {
      this.selectDate(this.filterType)

    }


  }




  selectDate(type) {
    this.isLoading = true;
   
    if(this.filterType != type){
      this.date = new Date()
    }
    this.filterType = type

    if (this.filterType == 'week') {
      this.dates = Array(7).fill(new Date(this.date)).map((el, idx) =>
        new Date(el.setDate(el.getDate() - el.getDay() + idx)))

      this.dateStart = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - this.date.getDay());
      this.dateEnd = new Date(this.dateStart.getFullYear(), this.dateStart.getMonth(), this.dateStart.getDate() + 6);

    } else {
      this.dateStart = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
      this.dateEnd = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
      // console.error(this.dateStart)
      // console.error(this.dateEnd)

    }
    this.getData();
  }

  selectAll(){
    this.workoutService.myWorkoutFilter = 'all'
    this.filterType = 'all'
    this.dateStart = "",
    this.dateEnd = ""
    this.getData()
  }

  changeDate(type) {
    if (type == 'next') {
      if (this.filterType == 'week') {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7)
      } else {
        //month
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1)
        // console.error(this.date)
      }

    } else {
      if (this.filterType == 'week') {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 7)
      } else {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1)
        // console.error(this.date)

      }

    }
    this.selectDate(this.filterType)

  }


  private getData() {
    // this.isLoading = true;
    this.workoutService.getMyWorkouts(this.userId, this.dateStart, this.dateEnd).subscribe(workouts => {
      this.workouts = workouts;
      this.isLoading = false;
      console.error(workouts);
    });
  }
}
