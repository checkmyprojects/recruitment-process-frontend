import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { ListComponent } from './admin/list/list.component';
import { ListCandidatesComponent } from './candidates/list-candidates/list-candidates.component';
import { BoardPeopleComponent } from './board-people/board-people.component';
import { CandidateComponent } from './candidates/candidate/candidate.component';
import { SelectionComponent } from './selection/selection/selection.component';
import { ListSelectionComponent } from './selection/list-selection/list-selection.component';
import { OneSelectionComponent } from './selection/one-selection/one-selection.component';
import { InterviewComponent } from './interview/interview/interview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    EditUserComponent,
    ListComponent,
    ListCandidatesComponent,
    BoardPeopleComponent,
    CandidateComponent,
    SelectionComponent,
    ListSelectionComponent,
    OneSelectionComponent,
    InterviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
