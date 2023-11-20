import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgramsService } from '../../../services/programs.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  programForm: FormGroup;
  private mode = 'create';
  isLoading = false;
  constructor(
    private programService: ProgramsService,
     private formbuilder: FormBuilder, 
     public snackBar: MatSnackBar,
     private location: Location,
     ) { }

  ngOnInit(): void {
    this.programForm = this.formbuilder.group({
      name: ['', Validators.required],
      description: [''],
    })
  }

  onSavePost() {
    console.error('form:', this.programForm.value)
    if (this.programForm.invalid) {
      console.error(this.programForm)
      return
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.programService.addProgram(this.programForm.value.name, this.programForm.value.description)
      this.snackBar.open("Successfully Created Post", "", { duration: 2000, verticalPosition: "top" })

    }
    // else {
    //   this.workoutService.updateUser(this.userId, this.form.value.firstName, this.form.value.lastName, this.form.value.email, this.form.value.role)
    // }

  }

  goBack(){
    this.location.back()
  }



}
