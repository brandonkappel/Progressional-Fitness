import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { Client } from 'src/app/private/clients/clients.model';
import { ClientsService } from 'src/app/private/clients/clients.service';
import { Program } from '../../programs/program.model';
import { ProgramsService } from '../../programs/programs.service';
import { Workout } from '../workout.model';
import { WorkoutItem } from '../workoutitem.model';


import { WorkoutsService } from '../workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  isLoading = false;
   mode = 'create';
  items: FormArray;
  workoutForm: FormGroup;
  itemForm: FormGroup;
  formItem: FormArray;
  sectionAdded: boolean = false
  date = new FormControl(new Date());
  usersPerPage: number;
  currentPage: number;
  usersSub: Subscription;
  users: Client[] = [];
  totalUsers: number;
  programs: Program[] = []
  private workoutId: string
  workout: Workout
  workoutItemForm: FormGroup;
  workoutI: any;
  workoutType: any;



  constructor(
    private workoutService: WorkoutsService,
    private formbuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private clientService: ClientsService,
    private programService: ProgramsService,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      console.error(param)
      this.workoutType = param.type
    })
    
    this.getData();



  }

  private getData() {
    if(this.workoutType != 'personal'){
      this.clientService.getUsers(this.usersPerPage, this.currentPage);
      this.usersSub = this.clientService.getUserUpdatedListener()
        .subscribe((userData: { users: Client[]; userCount: number; }) => {
          this.isLoading = false;
          this.totalUsers = userData.userCount;
          this.users = userData.users;
        });
      this.programService.getPrograms();
      this.programService.getProgramUpdatedListener()
        .subscribe((programData: { programs: Program[]; }) => {
          this.programs = programData.programs;
        });
    }
  


    this.workoutForm = this.formbuilder.group({
      workoutName: ['', Validators.required],
      date: ['', new Date],
      user: new FormControl(''),
      program: new FormControl(''),
      workoutItem: this.formbuilder.array([]),
      personalWorkout: new FormControl(this.workoutType == 'personal' ? '1': '0') 
    })
    console.error('this is a test', this.workoutForm.value)



    this.route.paramMap.subscribe((ParamMap: ParamMap) => {
      // console.error(ParamMap)
      if (ParamMap.has('id')) {
        this.mode = 'edit';
        this.workoutId = ParamMap.get('id')
        this.isLoading = true
        this.workoutService.getWorkout(this.workoutId).subscribe(workoutData => {
          // console.error(workoutData)

          this.isLoading = false
          this.workout = {
            id: workoutData._id,
            name: workoutData.name,
            date: workoutData.date,
            client: workoutData.client,
            creator: workoutData.creator,
            program: workoutData.program
          };
          this.workoutForm.patchValue({
            workoutName: this.workout.name,
            date: this.workout.date,
            user: this.workout.client,
            program: this.workout.program,
            personalWorkout: this.workoutType == 'personal' ? '1': '0'
          });
          
          this.workoutService.getWorkoutI(this.workout.id).subscribe(workoutItems => {
            // console.error(workoutItems)
            this.workoutI = workoutItems
            // console.error('ITEMS:', this.workoutI)
            // this.setWorkoutItems()
            let workoutItemControl = <FormArray>this.workoutForm.controls.workoutItem;
            this.workoutI.forEach(item => {
              workoutItemControl.push(this.formbuilder.group({ _id: item._id, name: item.name, description: item.description, comments: item.comments }))
            })

          })

        })
      } else {
        this.mode = 'create';
        this.workoutId = null
      }
    });
  }

  // setWorkoutItems() {
  //   let control = <FormArray>this.workoutForm.controls.workoutItem;
  //   this.workoutI.forEach(x => {
  //     control.push(this.formbuilder.group(x));
  //   })
  // }

  get workoutItems() {
    return this.workoutForm.get('workoutItem') as FormArray;
  }

  createWorkoutItems(): FormGroup {
    return new FormGroup({
      _id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      comments: new FormControl(''),
    })
  }



  public addItem() {
    this.workoutItems.push(this.createWorkoutItems())


  }

  public removeWorkoutItem(i, item) {
    console.error(i, item)
    this.workoutItems.removeAt(i)
    this.workoutService.deleteWorkoutItem(item).subscribe(item=> {
      console.error(item)
    })
    this.dialog.closeAll()
  }

  public openDelete(templateRef, i, item){
    console.error(item)
    let dialogRef = this.dialog.open(templateRef, {
      data: {
        item: item,
        index: i
      } 
    })
  }








  onSavePost() {
    console.error('SAVE STARTED ', this.workoutForm.value)


    if (this.workoutForm.invalid) {
      console.error('ERROR ON FORM', this.workoutForm)
      return
    }
    let workout = { name: this.workoutForm.value.workoutName, date: this.date.value, client: this.workoutForm.value.user, program: this.workoutForm.value.program, personalWorkout: this.workoutForm.value.personalWorkout }
    let workoutItem = this.workoutForm.value.workoutItem
    console.error('Item', workoutItem)
    // this.isLoading = true;
    if (this.mode === 'create') {
      this.workoutService.addWorkout(workout, workoutItem)
      this.snackBar.open("Successfully Created Post", "", { duration: 2000, verticalPosition: "top" })

    } else {
      this.workoutService.updateWorkout(this.workout.id, workout, workoutItem)
      this.snackBar.open("Successfully Update Post", "", { duration: 2000, verticalPosition: "top" })
    }


  }

}
