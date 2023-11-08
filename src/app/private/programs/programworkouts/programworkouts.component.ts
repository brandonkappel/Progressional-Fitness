import { Location } from '@angular/common';
import { Component, OnInit, QueryList } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WorkoutsService } from '../../../services/workouts.service';
import { Program } from '../program.model';
import { ProgramsService } from '../../../services/programs.service';

@Component({
  selector: 'app-programworkouts',
  templateUrl: './programworkouts.component.html',
  styleUrls: ['./programworkouts.component.css']
})
export class ProgramworkoutsComponent implements OnInit {
  workouts: any;
  program: Program;
  isLoading = false;
  isUserAdmin: boolean = false;

  constructor(
    private workoutService: WorkoutsService,
    public route: ActivatedRoute,
    private programService: ProgramsService,
    private location: Location,
    private authService: AuthService
    ) {


   }

  ngOnInit(): void {

    this.isUserAdmin = this.authService.getIsAdmin()



    this.route.paramMap.subscribe((ParamMap: ParamMap)=> {
      if( ParamMap.has('programId')){
        let programId = ParamMap.get('programId')
        this.isLoading = true
        this.workoutService.getProgramWorkouts(programId).subscribe(workoutData => {
          // console.error(workoutData)
          if(workoutData){
          this.workouts = workoutData
          console.error('workouts', this.workouts)

          } else {
            this.workouts = []
          }
          this.isLoading = false

        })
        this.programService.getProgram(programId).subscribe(programData => {
          // console.error(programData)
          this.program = {
            name: programData.name,
            id: programData._id,
            description: programData.description,
            creator: programData.creator
          }

        })
      }
    })

  }

  goBack(){
    this.location.back()
  }



}
