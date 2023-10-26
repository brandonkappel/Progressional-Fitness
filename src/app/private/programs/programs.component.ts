import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { WorkoutsService } from '../../services/workouts.service';
import {  Program } from './program.model';
import {  ProgramsService } from '../../services/programs.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  programs: Program[]=[]

  isLoading = false;
  private programSub: Subscription;
  public userIsAuthenticated = false
  private authStatusSub: Subscription
  userId: string;
  isUserAdmin: boolean = false ;





  constructor(
    private programService: ProgramsService,
    public authService: AuthService,
    protected router: Router,) { }

  ngOnInit(): void {
    this.isLoading = true
    this.isUserAdmin = this.authService.getIsAdmin()
    this.programService.getPrograms()
    this.programSub = this.programService.getProgramUpdatedListener()
      .subscribe((programData: { programs: Program[]}) => {
        this.isLoading = false
        this.programs = programData.programs;
        // console.error(this.programs)
      });
      this.userIsAuthenticated = this.authService.getIsAuth()
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId()
      });
  }

  // onChangedPage(pageData: PageEvent) {
  //   this.isLoading = true
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.workoutsPerPage = pageData.pageSize;
  //   this.programService.getWorkouts(this.workoutsPerPage, this.currentPage);
  // }



  onDelete(programId: string) {
    this.isLoading = true

    this.programService.deleteProgram(programId).subscribe(()=>{
      this.programService.getPrograms();
    });
  }

}
