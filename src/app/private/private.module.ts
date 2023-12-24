import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { ErrorComponent } from '../error/error.component';
import { ClientComponent } from './clients/client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { ProgramComponent } from './programs/program/program.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramworkoutsComponent } from './programs/programworkouts/programworkouts.component';
import { MyworkoutsComponent } from './myworkouts/myworkouts.component';
import { WorkoutComponent } from './create-workout/workout.component';
import { WorkoutdisplayComponent } from './workoutdisplay/workoutdisplay.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { AuthInterceptor } from '../auth/auth-interceptor';
import { ErrorInterceptor } from '../error-interceptor';
import { PrivateComponent } from './private.component';
import { PersonalTrainingComponent } from './personal-training/personal-training.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { FavoritesComponent } from './favorites/favorites.component';



@NgModule({
  declarations: [
    // ErrorComponent,
   
    ClientsComponent,
    ClientComponent,
    WorkoutsComponent,
    WorkoutComponent,
    ProgramsComponent,
    ProgramComponent,
    MyworkoutsComponent,
    ProgramworkoutsComponent,
    WorkoutdisplayComponent,
    PrivateComponent,
    PersonalTrainingComponent,
    DashboardComponent,
    SettingsComponent,
    FavoritesComponent
  ],
  imports: [
    PrivateRoutingModule,
    CommonModule,

    // BrowserModule,
    // AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatRadioModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    // NgbModule,
  ],



  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}

  ],
  bootstrap: [AppComponent],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PrivateModule { }
