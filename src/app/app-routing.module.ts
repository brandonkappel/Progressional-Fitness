import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './main/home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'posts', component: PostListComponent},
  {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'client/:userId', component: ClientComponent},
  {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
