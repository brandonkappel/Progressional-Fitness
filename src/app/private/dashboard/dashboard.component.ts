import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  loaded: boolean = false
  reports: any;
  weekDates: any
  monthDates: any
  today = new Date().toISOString().split('T')[0]


  filterType: String = 'week'

  date = new Date();
  newDate = new Date
  dateEnd: Date;
  dateStart: Date;

  constructor(
    private authService: AuthService,
    public reportsService: ReportsService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    // console.error('USER', this.user)



    this.getDates(this.reportsService.calendarFilter);

  }

  getDates(type) {
    if (this.reportsService.calendarFilter != type) {
      // console.error('updating date')
      this.date = new Date()
    }
    this.reportsService.calendarFilter = type


    if (this.reportsService.calendarFilter == 'week') {
      this.weekDates = Array(7).fill(new Date(this.date)).map((el, idx) =>
        ({ date: new Date(el.setDate(el.getDate() - el.getDay() + idx)).toISOString().split('T')[0] }))

      this.dateStart = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - this.date.getDay());
      this.dateEnd = new Date(this.dateStart.getFullYear(), this.dateStart.getMonth(), this.dateStart.getDate() + 6);
      // console.error('start',this.dateStart)
      // console.error('end',this.dateEnd)

      // console.error('week',this.weekDates)

    } else {
      // console.error(this.date)

      this.monthDates = this.getWeeksOfMonth(this.date)
      // console.error('month', this.monthDates);
    }

    this.getData()

  }

  getData() {
    this.reportsService.getreports(this.user._id, this.dateStart, this.dateEnd).subscribe((reports: any) => {
      // console.error(reports)
      if (reports) {
        this.reports = reports
        if (this.reports.workouts) {
          this.reports.workouts.forEach(workout => {
            if (workout.date) {
              workout.date = workout.date.split('T')[0]
            }
          })

          let workouts = this.reports.workouts
          console.error('workouts', workouts)
          // console.error(workouts)
          if (this.reportsService.calendarFilter == 'week') {
            this.weekDates.forEach((date, i) => {
              workouts.forEach(workout => {
                if (workout.date) {
                  if (date.date == workout.date) {
                    if (date.workout) {
                      date.workout.push(workout)
                    } else {
                      date.workout = [workout]
                    }
                  }
                }
              })
            })
          } else {
            this.monthDates.forEach(week => {
              week.forEach(day => {
                workouts.forEach(workout => {
                  if (workout.date) {
                    if (day.date == workout.date) {
                      if (day.workout) {
                        day.workout.push(workout)
                      } else {
                        day.workout = [workout]
                      }
                    }
                  }
                })
              })
            })
          }
        }

      }
      this.loaded = true
    })
  }

  getWeeksOfMonth(newDate) {
    const weeks = [];
    this.dateStart = new Date(newDate.getFullYear(), newDate.getMonth(), 1);


    this.dateEnd = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0); // Get the last day of the month

    const daysInMonth = this.dateEnd.getDate();

    let currentWeek = [];

    // Add days from the previous month
    for (let i = this.dateStart.getDay(); i > 0; i--) {
      currentWeek.push({
        date: new Date(newDate.getFullYear(), newDate.getMonth(), 0 - i + 1).toISOString().split('T')[0],
        isCurrentMonth: false,
      });
    }
    if (currentWeek.length != 0) {
      this.dateStart = currentWeek[0].date
    }


    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push({
        date: new Date(newDate.getFullYear(), newDate.getMonth(), day).toISOString().split('T')[0],
        isCurrentMonth: true,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Add days from the next month
    let nextMonthDay = 1;
    for (let i = currentWeek.length; i < 7; i++) {
      currentWeek.push({
        date: new Date(newDate.getFullYear(), newDate.getMonth() + 1, nextMonthDay).toISOString().split('T')[0],
        isCurrentMonth: false,
      });
      nextMonthDay++;
    }
    if (currentWeek.length != 0) {
      let lastDay = currentWeek.slice(-1)
      this.dateEnd = lastDay[0].date
    }

    weeks.push(currentWeek); // Add the last week

    return weeks;
  }

  changeDate(type) {
    if (type == 'next') {
      if (this.reportsService.calendarFilter == 'week') {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7)
      } else {
        //month
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1)
        // console.error(this.date)
      }
    } else {
      if (this.reportsService.calendarFilter == 'week') {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 7)
      } else {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1)
        // console.error(this.date)
      }
    }
    this.getDates(this.reportsService.calendarFilter)
  }

  openWorkout(workout, dialog: any = null) {
    console.error(workout)

    if (workout.workout && workout.workout.length > 1) {
      //open a modal to select the workout
      this.dialog.open(dialog, {
        data: {
          workouts: workout.workout,
        }
      })

    } else {
      if (workout.workout) {
        this.router.navigate(['/private/workoutDisplay/' + workout.workout[0]._id])
      } else if (workout._id) {
        this.router.navigate(['/private/workoutDisplay/' + workout._id])
      } else {
        this.snackBar.open("No workout for selected date", "", { duration: 2000, verticalPosition: "top" })

      }
    }

  }


}
