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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from './model/CustomPaginatorConfiguration';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalUserComponent } from './admin/modal-user/modal-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalCandidatesComponent } from './candidates/modal-candidates/modal-candidates.component';
import { ModalUserNewComponent } from './admin/modal-user-new/modal-user-new.component';
import { ModalCandidateNewComponent } from './candidates/modal-candidate-new/modal-candidate-new.component';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
// Material table sort arrow
import { MatSortModule } from '@angular/material/sort';
import { ListInterviewComponent } from './interview/list-interview/list-interview.component';

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
    InterviewComponent,
    ModalUserComponent,
    ModalCandidatesComponent,
    ModalUserNewComponent,
    ModalCandidateNewComponent,
    ListInterviewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDividerModule,
    MatSortModule,
    MatExpansionModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders, { provide: MatPaginatorIntl, useValue: CustomPaginator() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
