import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './main/home/home.component';

import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutComponent } from './workouts/workout/workout.component';
import { ProgramComponent } from './programs/program/program.component';
import { ProgramsComponent } from './programs/programs.component';
import { MyworkoutsComponent } from './workouts/myworkouts/myworkouts.component';
import { ProgramworkoutsComponent } from './programs/programworkouts/programworkouts.component';
import { ProgramsService } from './programs/programs.service';
import { WorkoutdisplayComponent } from './workouts/workoutdisplay/workoutdisplay.component';
import { PublicComponent } from './public/public.component';
import { ClientsComponent } from './private/clients/clients.component';
import { ClientComponent } from './private/clients/client/client.component';


const routes: Routes = [
  {path: '', component: PublicComponent},
  {path: 'fitness', component: HomeComponent},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
  {path: 'posts', component: PostListComponent, canActivate: [AuthGuard]},
  {path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuard]},
  {path: 'workout', component: WorkoutComponent},
  {path: 'myworkouts', component: MyworkoutsComponent, canActivate: [AuthGuard] },
  {path: 'workoutDisplay/:workoutId', component: WorkoutdisplayComponent},

  {path: 'program', component: ProgramComponent},
  {path: 'programs', component: ProgramsComponent, canActivate: [AuthGuard]},
  {path: 'programWorkout/:programId', component: ProgramworkoutsComponent},
  {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'editClient/:userId', component: ClientComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
