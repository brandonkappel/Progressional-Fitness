import { Component, OnInit, QueryList } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WorkoutsService } from 'src/app/workouts/workouts.service';
import { Program } from '../program.model';
import { ProgramsService } from '../programs.service';

@Component({
  selector: 'app-programworkouts',
  templateUrl: './programworkouts.component.html',
  styleUrls: ['./programworkouts.component.css']
})
export class ProgramworkoutsComponent implements OnInit {
  workouts: Object;
  program: Program;
  isLoading = false;

  constructor(
    private workoutService: WorkoutsService,
    public route: ActivatedRoute,
    private programService: ProgramsService) {


   }

  ngOnInit(): void {



    this.route.paramMap.subscribe((ParamMap: ParamMap)=> {
      if( ParamMap.has('programId')){
        let programId = ParamMap.get('programId')
        this.isLoading = true
        this.workoutService.getProgramWorkouts(programId).subscribe(workoutData => {
          console.error(workoutData)
          this.workouts = workoutData
        })
        this.programService.getProgram(programId).subscribe(programData => {
          console.error(programData)
          this.program = {
            name: programData.name,
            id: programData._id,
            description: programData.description,
            creator: programData.creator
          }
        this.isLoading = false

        })
      }
    })

  }



}
