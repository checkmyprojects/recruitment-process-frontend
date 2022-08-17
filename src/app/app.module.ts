import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { BoardAdminComponent } from './components/admin/board-admin/board-admin.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { ListComponent } from './components/admin/list/list.component';
import { ListCandidatesComponent } from './components/candidates/list-candidates/list-candidates.component';
import { BoardPeopleComponent } from './components/candidates/board-people/board-people.component';
import { CandidateComponent } from './components/candidates/candidate/candidate.component';
import { SelectionComponent } from './components/selection/selection/selection.component';
import { ListSelectionComponent } from './components/selection/list-selection/list-selection.component';
import { OneSelectionComponent } from './components/selection/one-selection/one-selection.component';
import { InterviewComponent } from './components/interview/interview/interview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from './config/CustomPaginatorConfiguration';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalUserComponent } from './components/admin/modal-user/modal-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalCandidatesComponent } from './components/candidates/modal-candidates/modal-candidates.component';
import { ModalUserNewComponent } from './components/admin/modal-user-new/modal-user-new.component';
import { ModalCandidateNewComponent } from './components/candidates/modal-candidate-new/modal-candidate-new.component';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider'
// Material table sort arrow
import { MatSortModule } from '@angular/material/sort';
import { ListInterviewComponent } from './components/interview/list-interview/list-interview.component';
import { ModalSelectionNewComponent } from './components/selection/modal-selection-new/modal-selection-new.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NewInterviewComponent } from './components/interview/new-interview/new-interview.component'
// Imports for DateTime Picker
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ModalSelectionComponent } from './components/selection/modal-selection/modal-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
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
    HeaderComponent,
    ModalSelectionNewComponent,
    NewInterviewComponent,
    ModalSelectionComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders, { provide: MatPaginatorIntl, useValue: CustomPaginator() }, { provide: LOCALE_ID, useValue: 'es-ES'}],
  bootstrap: [AppComponent]
}) // { provide: LOCALE_ID, useValue: 'es-ES'} is used to change default angular locale to spanish
export class AppModule { }
