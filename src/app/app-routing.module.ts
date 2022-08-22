import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListInterviewComponent } from './components/interview/list-interview/list-interview.component';
import { BoardPeopleComponent } from './components/candidates/board-people/board-people.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { BoardAdminComponent } from './components/admin/board-admin/board-admin.component';
import { HomeComponent } from './components/home/home.component';
import { InterviewComponent } from './components/interview/interview/interview.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SelectionComponent } from './components/selection/selection/selection.component';
import { NewInterviewComponent } from './components/interview/new-interview/new-interview.component';
import { AuthGuardService as AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'people', component: BoardPeopleComponent },
  { path: 'selection', component: SelectionComponent },
  { path: 'admin/edit/:id', component: EditUserComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'interview', component: ListInterviewComponent},
  { path: 'interview/new', component: NewInterviewComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

// Routes array is passed to the RouterModule.forRoot() method.
// We’re gonna use <router-outlet></router-outlet> directive in the App Component where contains navbar and display Components (corresponding to routes) content.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
