import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardAdminComponent } from './components/admin/board-admin/board-admin.component';
import { ModalUserNewComponent } from './components/admin/modal-user-new/modal-user-new.component';
import { ModalUserComponent } from './components/admin/modal-user/modal-user.component';
import { BoardPeopleComponent } from './components/candidates/board-people/board-people.component';
import { ListCandidatesComponent } from './components/candidates/list-candidates/list-candidates.component';
import { ModalCandidateNewComponent } from './components/candidates/modal-candidate-new/modal-candidate-new.component';
import { ModalCandidatesComponent } from './components/candidates/modal-candidates/modal-candidates.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ListSelectionComponent } from './components/selection/list-selection/list-selection.component';
import { SelectionComponent } from './components/selection/selection/selection.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { CustomPaginator } from './config/CustomPaginatorConfiguration';
import { authInterceptorProviders } from './helpers/auth.interceptor';
// Material table sort arrow
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { ListInterviewComponent } from './components/interview/list-interview/list-interview.component';
import { NewInterviewComponent } from './components/interview/new-interview/new-interview.component';
import { ModalSelectionNewComponent } from './components/selection/modal-selection-new/modal-selection-new.component';
// Imports for DateTime Picker
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalSelectionComponent } from './components/selection/modal-selection/modal-selection.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalInterviewComponent } from './components/interview/modal-interview/modal-interview.component';
import {BreadcrumbModule} from 'xng-breadcrumb';

//import { MaterialModule } from '@angular/material/module' ;


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    ListCandidatesComponent,
    BoardPeopleComponent,
    SelectionComponent,
    ListSelectionComponent,
    ModalUserComponent,
    ModalCandidatesComponent,
    ModalUserNewComponent,
    ModalCandidateNewComponent,
    ListInterviewComponent,
    HeaderComponent,
    ModalSelectionNewComponent,
    NewInterviewComponent,
    ModalSelectionComponent,
    ModalInterviewComponent
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
    MatTabsModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatGridListModule,
    MatCardModule
  ],
  providers: [authInterceptorProviders, { provide: MatPaginatorIntl, useValue: CustomPaginator() }, { provide: LOCALE_ID, useValue: 'es-ES'}],
  bootstrap: [AppComponent]
}) // { provide: LOCALE_ID, useValue: 'es-ES'} is used to change default angular locale to spanish
export class AppModule { }
