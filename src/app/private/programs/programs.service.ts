import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Program,  } from './program.model';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  private programs: Program[] = []
  private programsUpdated = new Subject<{ programs: Program[] }>()


  constructor(private http: HttpClient, private router: Router) { }



  getPrograms() {
    // const queryParams = `?pagesize=${workoutsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, programs: any}>(
      'http://localhost:3000/api/programs' )
      .pipe(map((programData) => {
        return {
          programs: programData.programs.map(program => {
            return {
              name: program.name,
              description: program.description,
              id: program._id,
              creator: program.creator
            };
          }),
        };
      }))
      .subscribe((transformedProgramData) => {
        this.programs = transformedProgramData.programs;
        this.programsUpdated.next({ programs: [...this.programs] });
      });
  }

  // getPrograms(){
  //   return this.http.get('http://localhost:3000/api/programs')
  // }

  updateProgram(id: string, ) {
    const program = this.programs
    console.error(program)
    this.http.put("http://localhost:3000/api/programs/" + id, program)
      .subscribe(response => {
        console.error(response)
        this.router.navigate(["/programs"])

      })
  }

  addProgram(name: string, description: Date, ) {
    // console.error(workout)
    const programData = {name: name, date: description}
    // console.error(workoutData)
    this.http.post<{ message: string, programId: any }>('http://localhost:3000/api/programs', programData)
      .subscribe((responseData) => {
        console.error('Program:',responseData)
        this.router.navigate(["/"])
      });
  }


  getProgramUpdatedListener() {
    return this.programsUpdated.asObservable();
  }

  getProgram(id: string) {
    return this.http.get<{_id: string, name: string, description: string, creator: string}>("http://localhost:3000/api/programs/" + id);
  }

  deleteProgram(programId: string) {
    return this.http.delete("http://localhost:3000/api/programs/" + programId)

  }


}
