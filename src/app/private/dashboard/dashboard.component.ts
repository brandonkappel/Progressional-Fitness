import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  loaded:boolean = false
  reports: any;
  dates:any
  check = [
    {date: '', workout:''},
   
  ]

  date = new Date();
  newDate = new Date 

  constructor(
    private authService: AuthService,
    private reportsService: ReportsService
  ){}

  ngOnInit(){
    console.error(this.check)
    this.user = JSON.parse(localStorage.getItem('user'))
    console.error('USER', this.user)
    this.dates = Array(7).fill(null).map((el, idx) =>
    ({ date: new Date(this.date.setDate(this.date.getDate() - this.date.getDay() + idx)).toISOString().split('T')[0]}) )
   
    console.error(this.dates)


    this.getData()
  }

  getData(){
    this.reportsService.getreports(this.user._id).subscribe((reports:any)=> {
      // console.error(reports)
      if(reports){
      this.reports = reports
      if(this.reports.workouts){
        this.reports.workouts.forEach(workout=> {
          if(workout.date){
           workout.date =  workout.date.split('T')[0]

          }
        })

        let workouts = this.reports.workouts
        // console.error(workouts)

        this.dates.forEach((date, i)=> {
          workouts.forEach(workout=> {
            if(workout.date){
              if(date.date == workout.date){
                date.workout = workout
                // console.error(this.dates[i])
                
              }
            }
            
          })
          // this.dates[i].workout = 'hello'
        })


      }
      console.error(this.reports)

      

      }
      this.loaded = true
    })

   
  }


}
