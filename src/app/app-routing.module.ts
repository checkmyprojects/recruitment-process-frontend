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
// Import Authguard class to protect routes for non authorized users
import { AuthGuard } from './helpers/auth-guard';

// To protect a route and allow access only to users with role ROLE_ADMIN, use: "canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN']}}"
// role is an array, it can contain multiple roles and authguard will check all items on the array
// To have a route unrestricted, just don't include "canActivate" or "data"
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN']}},
  { path: 'people', component: BoardPeopleComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_PEOPLE']}},
  { path: 'selection', component: SelectionComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_PEOPLE']}},
  { path: 'admin/edit/:id', component: EditUserComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_PEOPLE']}},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'interview', component: ListInterviewComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_PEOPLE', 'ROLE_INTERVIEWER']}},
  { path: 'interview/new', component: NewInterviewComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_PEOPLE', 'ROLE_INTERVIEWER']}}
];

// Routes array is passed to the RouterModule.forRoot() method.
// We’re gonna use <router-outlet></router-outlet> directive in the App Component where contains navbar and display Components (corresponding to routes) content.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
