import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Candidate } from '../../../model/candidate';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CandidatesService } from 'src/app/services/candidates.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modal-candidate-new',
  templateUrl: './modal-candidate-new.component.html',
  styleUrls: ['./modal-candidate-new.component.css']
})
export class ModalCandidateNewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {candidate: Candidate}, private candidateService: CandidatesService, public dialogRef: MatDialogRef<ModalCandidateNewComponent>, public snackBar: MatSnackBar) { }

  // New candidate to send back when creating one
  newCandidate: any = {
    name: "",
    surname: "",
    email: "",
    skills: "",
    studies: "",
    location: "",
    experience: 0,
    state: "",
    notes: "",
  }
  newCandidateForm: FormGroup | any;

  ngOnInit(): void {
    // Initialize form
    this.newCandidateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4),]),
      surname: new FormControl('', [Validators.required, Validators.minLength(4),]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      skills: new FormControl('', ),
      studies: new FormControl('', ),
      location: new FormControl('', ),
      experience: new FormControl('', ),
      state: new FormControl('', ),
      notes: new FormControl('', [Validators.minLength(4),]),

    });
  }

  saveCandidate(){
    this.candidateService.registerNewCandidate(this.newCandidate).subscribe({
      next: response => {
        this.openSnackBar('¡Candidato creado con éxito!', '');

        // Take response from backend and insert it into the table
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
        this.data.candidate.interviews = response.interviews;
        this.data.candidate.notes = response.notes;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('There was an error!', error);
      }
   });
  }

  // Snackbar config
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
