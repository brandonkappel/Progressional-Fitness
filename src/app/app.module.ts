import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule } from "@angular/material/expansion";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main/main.component';
import { ClientsComponent } from './private/clients/clients.component';
import { ClientComponent } from './private/clients/client/client.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';

import { MatNativeDateModule } from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { ProgramComponent } from './private/programs/program/program.component';
import { ProgramsComponent } from './private/programs/programs.component';
import { ProgramworkoutsComponent } from './private/programs/programworkouts/programworkouts.component';
import { MyworkoutsComponent } from './private/workouts/myworkouts/myworkouts.component';
import { WorkoutComponent } from './private/workouts/workout/workout.component';
import { WorkoutdisplayComponent } from './private/workouts/workoutdisplay/workoutdisplay.component';
import { WorkoutsComponent } from './private/workouts/workouts.component';



@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MainComponent,
    ClientsComponent,
    ClientComponent,
    ErrorComponent,
    WorkoutsComponent,
    WorkoutComponent,
    ProgramsComponent,
    ProgramComponent,
    MyworkoutsComponent,
    ProgramworkoutsComponent,
    WorkoutdisplayComponent,
    PublicComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
  ],



  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}

  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {



}

