import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { ClientComponent } from './clients/client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { ProgramComponent } from './programs/program/program.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramworkoutsComponent } from './programs/programworkouts/programworkouts.component';
import { MyworkoutsComponent } from './myworkouts/myworkouts.component';
import { WorkoutComponent } from './create-workout/workout.component';
import { WorkoutdisplayComponent } from './workoutdisplay/workoutdisplay.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { PrivateComponent } from './private.component';
import { PersonalTrainingComponent } from './personal-training/personal-training.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '', component: PrivateComponent, children: [
      { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard, RoleGuard], },
      { path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuard] },
      { path: 'editWorkout/:id', component: WorkoutComponent, canActivate: [AuthGuard] },
      { path: 'workout', component: WorkoutComponent },
      { path: 'myworkouts', component: MyworkoutsComponent, canActivate: [AuthGuard] },

      { path: 'workoutDisplay/:workoutId', component: WorkoutdisplayComponent },

      { path: 'program', component: ProgramComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'programs', component: ProgramsComponent, canActivate: [AuthGuard] },
      { path: 'programWorkout/:programId', component: ProgramworkoutsComponent },
      { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
      { path: 'editClient/:userId', component: ClientComponent },
      { path: 'personalTraining', component: PersonalTrainingComponent },
      { path: 'dashboard', component: DashboardComponent,},
      { path: 'favorites', component: FavoritesComponent,},
  

      { path: 'settings', component: SettingsComponent },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PrivateRoutingModule { }
