import { FormControl, Validators } from '@angular/forms';
import { Candidate } from './../../model/candidate';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-modal-candidates',
  templateUrl: './modal-candidates.component.html',
  styleUrls: ['./modal-candidates.component.css']
})
export class ModalCandidatesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {candidate: Candidate}, public dialogRef: MatDialogRef<ModalCandidatesComponent>) { }

  emailFormControl = new FormControl(this.data.candidate.email, [Validators.required, Validators.email]);

  editedCandidate: Candidate = JSON.parse(JSON.stringify(this.data.candidate));
  ngOnInit(): void {
  }
  saveCandidate(){
    this.data.candidate.state = this.editedCandidate.state;
    this.data.candidate.name = this.editedCandidate.name;
    this.data.candidate.surname = this.editedCandidate.surname;
    this.data.candidate.email = this.editedCandidate.email;
    this.data.candidate.location = this.editedCandidate.location;
    this.data.candidate.skills = this.editedCandidate.skills;
    this.data.candidate.experience = this.editedCandidate.experience;
    this.data.candidate.studies = this.editedCandidate.studies;
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
