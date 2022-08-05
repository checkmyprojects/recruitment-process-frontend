import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Candidate } from './../../model/candidate';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CandidatesService } from 'src/app/_services/candidates.service';


@Component({
  selector: 'app-modal-candidates',
  templateUrl: './modal-candidates.component.html',
  styleUrls: ['./modal-candidates.component.css']
})
export class ModalCandidatesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {candidate: Candidate}, private candidateService: CandidatesService, public dialogRef: MatDialogRef<ModalCandidatesComponent>) { }

  emailFormControl = new FormControl(this.data.candidate.email, [Validators.required, Validators.email]);

  editedCandidate: Candidate = JSON.parse(JSON.stringify(this.data.candidate));
  ngOnInit(): void {
  }

  saveCandidate(){
    //fix to remove the interview part of the candidate so that the backend does not give problems. You have to create an empty user or from scratch instead of copying the other one.
    this.editedCandidate.interviews = [];
    this.candidateService.updateCandidate(this.editedCandidate).subscribe({
      next: response => {
        this.data.candidate.state = response.state;
        this.data.candidate.name = response.name;
        this.data.candidate.surname = response.surname;
        this.data.candidate.email = response.email;
        this.data.candidate.location = response.location;
        this.data.candidate.skills = response.skills;
        this.data.candidate.experience = response.experience;
        this.data.candidate.studies = response.studies;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('There was an error!', error);
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

}
