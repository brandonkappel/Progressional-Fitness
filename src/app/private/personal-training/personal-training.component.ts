import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from '../../services/workouts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-personal-training',
  templateUrl: './personal-training.component.html',
  styleUrls: ['./personal-training.component.css']
})
export class PersonalTrainingComponent implements OnInit {

  userId: string;
  workouts: any;
  isLoading = false;

  date = new Date();
  dateStart
  dateEnd

  filterType: String = 'week'


  constructor(
    private workoutService: WorkoutsService,
    private authService: AuthService
    ){
    this.userId = this.authService.getUserId()
  }

  ngOnInit(){
    // this.searchWorkouts()
    this.selectDate(this.filterType)
  }

  selectDate(type) {
    this.isLoading = true;
    if(this.filterType != type){
      this.date = new Date()
    }
    this.filterType = type

    if (this.filterType == 'week') {

      this.dateStart = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - this.date.getDay());
      this.dateEnd = new Date(this.dateStart.getFullYear(), this.dateStart.getMonth(), this.dateStart.getDate() + 6);

    } else {
      this.dateStart = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
      this.dateEnd = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
      console.error(this.dateStart)
      console.error(this.dateEnd)

    }
    this.searchWorkouts();
  }

  changeDate(type) {
    if (type == 'next') {
      if (this.filterType == 'week') {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7)
      } else {
        //month
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1)
        console.error(this.date)
      }

    } else {
      if (this.filterType == 'week') {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 7)
      } else {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1)
        console.error(this.date)
      }
    }
    this.selectDate(this.filterType)
  }

  selectAll(){
    this.filterType = 'all'
    this.dateStart = "",
    this.dateEnd = ""
    this.searchWorkouts()
  }

  searchWorkouts(){
    this.workoutService.getPersonalTrainingWorkouts(this.userId, this.dateStart, this.dateEnd).subscribe(workouts => {
      this.workouts = workouts;
      this.isLoading = false;
      console.error('PERSONAL WORKOUTS:', workouts);
    });
  }

}
