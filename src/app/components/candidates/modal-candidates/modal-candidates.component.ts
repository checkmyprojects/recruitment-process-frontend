import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Candidate } from '../../../model/candidate';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CandidatesService } from 'src/app/services/candidates.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-candidates',
  templateUrl: './modal-candidates.component.html',
  styleUrls: ['./modal-candidates.component.css']
})
export class ModalCandidatesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {candidate: Candidate}, private candidateService: CandidatesService, public dialogRef: MatDialogRef<ModalCandidatesComponent>, private _snackBar: MatSnackBar) { }

  // Create a new user from the one received from the parent to edit on that new one instead of the original on the table
  editedCandidate: Candidate = JSON.parse(JSON.stringify(this.data.candidate));

  editCandidateForm: FormGroup | any;

  ngOnInit(): void {
    // Initialize form
    this.editCandidateForm = new FormGroup({
      id: new FormControl(this.data.candidate.id, [Validators.required]),
      name: new FormControl(this.data.candidate.name, [Validators.required, Validators.minLength(4),]),
      surname: new FormControl(this.data.candidate.surname, [Validators.required, Validators.minLength(4),]),
      email: new FormControl(this.data.candidate.email, [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      skills: new FormControl(this.data.candidate.skills, [Validators.required, Validators.minLength(4),]),
      studies: new FormControl(this.data.candidate.studies, [Validators.required, Validators.minLength(4),]),
      location: new FormControl(this.data.candidate.location, [Validators.required, Validators.minLength(4),]),
      experience: new FormControl(this.data.candidate.experience, [Validators.required,]),
      state: new FormControl(this.data.candidate.state, [Validators.required, Validators.minLength(4),]),
      hired: new FormControl(this.data.candidate.hired, []), //Hired does not need any validation
      notes: new FormControl(this.data.candidate.notes, [Validators.minLength(4),]),
    });
  }

  saveCandidate(){
    //fix to remove the interview part of the candidate so that the backend does not give problems. You have to create an empty user from scratch instead of copying the other one.
    this.editedCandidate.interviews = [];
    this.editedCandidate.hired = this.editCandidateForm.controls.hired.value;

    // Send editCandidateForm Form instead of editedCandidate object
    this.candidateService.updateCandidate(this.editCandidateForm.value).subscribe({
      next: response => {
        this.openSnackBar('¡Candidato editado con éxito!', '');

        // Edit table user
        this.data.candidate.id = response.id;
        this.data.candidate.state = response.state;
        this.data.candidate.name = response.name;
        this.data.candidate.surname = response.surname;
        this.data.candidate.email = response.email;
        this.data.candidate.location = response.location;
        this.data.candidate.skills = response.skills;
        this.data.candidate.experience = response.experience;
        this.data.candidate.studies = response.studies;
        this.data.candidate.hired = response.hired;
        this.data.candidate.notes = response.notes;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('¡Hubo un error!', error);
      }
    });
  }
  confirmDelete() {
    // If user clic accept, it calls the function to close the dialog returning false, that will trigger the delete on parent component
    if(confirm("¿Seguro de que quieres borrar el usuario?")){
      this.closeDialog(false);
    }
  }
  // Needs to add public dialogRef: MatDialogRef<ModalUserComponent> into the constructor
  // Function to close the dialog. It can return true or false
  closeDialog(choice:boolean) {
    this.dialogRef.close(choice);
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }


}
