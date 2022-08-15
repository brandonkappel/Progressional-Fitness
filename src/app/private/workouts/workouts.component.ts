import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Client } from '../clients/clients.model';
import { ClientsService } from '../clients/clients.service';
import { Program } from '../programs/program.model';
import { ProgramsService } from '../programs/programs.service';
import { Workout } from './workout.model';
import { WorkoutsService } from './workouts.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts: Workout[] = []

  isLoading = false;
  workoutsPerPage = 10;
  currentPage = 1;
  private workoutSub: Subscription;
  totalWorkouts = 0;
  public userIsAuthenticated = false
  private authStatusSub: Subscription
  userId: string;
  pageSizeOptions = [1, 2, 5, 10]
  workoutType: any
  usersPerPage: number;
  usersSub: Subscription;
  totalUsers: number;
  users: Client[];
  programs: Program[];
  selectedClient: any;
  selectedProgram: any;






  constructor(private workoutService: WorkoutsService,
    public authService: AuthService,
    private clientService: ClientsService,
    private programService: ProgramsService,
  ) { }

  ngOnInit(): void {
    this.workoutType = 'all'
    this.selectedClient= 'all'
    this.selectedProgram = 'all'
    this.getData();
  }

  private getData() {
    this.isLoading = true
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
    this.workoutService.getWorkouts(this.workoutsPerPage, this.currentPage, this.workoutType, this.selectedClient, this.selectedProgram);
    this.workoutSub = this.workoutService.getWorkoutUpdatedListener()
      .subscribe((workoutData: { workouts: Workout[]; workoutCount: number; }) => {
        this.isLoading = false;
        this.totalWorkouts = workoutData.workoutCount;
        this.workouts = workoutData.workouts;
        // console.error(this.workouts);
      });
    this.clientService.getUsers(this.usersPerPage, this.currentPage)
    this.usersSub = this.clientService.getUserUpdatedListener()
      .subscribe((userData: { users: Client[], userCount: number }) => {
        this.isLoading = false
        this.totalUsers = userData.userCount
        this.users = userData.users;
      });
    this.programService.getPrograms()
    this.programService.getProgramUpdatedListener()
      .subscribe((programData: { programs: Program[] }) => {
        this.programs = programData.programs
        // console.error(this.programs)
      })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1;
    this.workoutsPerPage = pageData.pageSize;
    this.workoutService.getWorkouts(this.workoutsPerPage, this.currentPage, 'all', 'all', 'all');
  }

  workoutTypeSelect(e) {
    this.workoutType = e
    this.getData()
  }

  clientSelect(e) {
    this.selectedClient = e
    this.getData()
  }

  programSelect(e) {
    this.selectedProgram = e
    this.getData()

  }

  onDelete(workoutId: string) {
    this.isLoading = true

    this.workoutService.deleteWorkout(workoutId).subscribe(() => {
      this.workoutService.getWorkouts(this.workoutsPerPage, this.currentPage, 'all', 'all', 'all')
    });
  }

}
