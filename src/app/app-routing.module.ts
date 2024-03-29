import { ListInterviewComponent } from './components/interview/list-interview/list-interview.component';
import { BoardPeopleComponent } from './components/candidates/board-people/board-people.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './components/admin/board-admin/board-admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SelectionComponent } from './components/selection/selection/selection.component';
import { NewInterviewComponent } from './components/interview/new-interview/new-interview.component';
// Import Authguard class to protect routes for non authorized users
import { AuthGuard } from './helpers/auth-guard';
import { StatisticsComponent } from './components/statistics/statistics.component';

// === Authguard ===
// To protect a route and allow access only to users with role ROLE_ADMIN, use: "canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN']}}"
// role is an array, it can contain multiple roles and authguard will check all items on the array
// To have a route unrestricted, just don't include "canActivate" or "data"
// 
// === Breadcrumbs ===
// Auto generated at header component using xng-breadcrumb
// breadcrumb property is used by xng-breadcrumb module to configure it. Label for the text and info for mat-icon name
// More info about module at https://github.com/udayvunnam/xng-breadcrumb
// Install module: npm install --save xng-breadcrumb
const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { breadcrumb: { label: 'Inicio', info: 'home' }} },
  { path: 'login', component: LoginComponent, data: {breadcrumb: { label: 'Iniciar sesión', info: 'account_circle' }} },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN'], breadcrumb: { label: 'Administración', info: 'keyboard' }}},
  { path: 'people', component: BoardPeopleComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_PEOPLE'], breadcrumb: { label: 'Candidatos', info: 'people' }}},
  { path: 'selection', component: SelectionComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_PEOPLE'], breadcrumb: { label: 'Procesos de selección', info: 'assignment' }}},
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { breadcrumb: { label: 'Inicio', info: 'home' }} },
  { path: 'interview', component: ListInterviewComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_PEOPLE', 'ROLE_INTERVIEWER'], breadcrumb: { label: 'Entrevistas', info: 'event_note' }}},
  { path: 'interview/new', component: NewInterviewComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_PEOPLE', 'ROLE_INTERVIEWER']}},
  // { path: '**', redirectTo: '' }
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_BUSINESS'], breadcrumb: { label: 'Estadísticas', info: 'query_stats' }} }
];

// Routes array is passed to the RouterModule.forRoot() method.
// We’re gonna use <router-outlet></router-outlet> directive in the App Component where contains navbar and display Components (corresponding to routes) content.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
