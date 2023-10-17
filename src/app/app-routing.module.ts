import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './main/home/home.component';


import { PublicComponent } from './public/public.component';
import { ClientsComponent } from './private/clients/clients.component';
import { ClientComponent } from './private/clients/client/client.component';
import { ProgramComponent } from './private/programs/program/program.component';
import { ProgramsComponent } from './private/programs/programs.component';
import { ProgramworkoutsComponent } from './private/programs/programworkouts/programworkouts.component';
import { MyworkoutsComponent } from './private/workouts/myworkouts/myworkouts.component';
import { WorkoutComponent } from './private/workouts/workout/workout.component';
import { WorkoutdisplayComponent } from './private/workouts/workoutdisplay/workoutdisplay.component';
import { WorkoutsComponent } from './private/workouts/workouts.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { RoleGuard } from './auth/role.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';


const routes: Routes = [
  {path: '', component: PublicComponent},
  {path: 'fitness', component: HomeComponent},

  // {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard, RoleGuard] ,   }  ,
  // {path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuard]},
  // {path: 'editWorkout/:id', component: WorkoutComponent, canActivate: [AuthGuard]},
  // {path: 'workout', component: WorkoutComponent},
  // {path: 'myworkouts', component: MyworkoutsComponent, canActivate: [AuthGuard] },
  // {path: 'workoutDisplay/:workoutId', component: WorkoutdisplayComponent},

  // {path: 'program', component: ProgramComponent, canActivate: [AuthGuard, RoleGuard] },
  // {path: 'programs', component: ProgramsComponent, canActivate: [AuthGuard] },
  // {path: 'programWorkout/:programId', component: ProgramworkoutsComponent},
  // {path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  // {path: 'editClient/:userId', component: ClientComponent},

  //posts
  {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'posts', component: PostListComponent, canActivate: [AuthGuard]},




  
//Auth Stuff
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'verify', component: VerifyComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},

  {
    path: 'private',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
