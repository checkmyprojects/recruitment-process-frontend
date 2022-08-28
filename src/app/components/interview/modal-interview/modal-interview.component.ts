import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Interview } from 'src/app/model/interview';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-modal-interview',
  templateUrl: './modal-interview.component.html',
  styleUrls: ['./modal-interview.component.css']
})
export class ModalInterviewComponent implements OnInit {

  newInterviewView = true;

  // get data from candidate list component
  editInterviewCandidate: any = this.data.interview.candidate;
  getCandidate($event: any) {this.editInterviewCandidate = $event;}

  // get data from selection list component
  editInterviewSelection: any = this.data.interview.selection;
  getSelection($event: any) {this.editInterviewSelection = $event;}

  // get data from appuser list component
  editInterviewAppUser: any = this.data.interview.interviewer;
  getInterviewer($event: any) {this.editInterviewAppUser = $event;}

  interviewDate: Date = new Date(this.data.interview.interview_date);
  interviewFeedback = this.data.interview.feedback;
  interviewStatus = this.data.interview.status;

  // Date picker min date is now
  minDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {interview: Interview}, private interviewService: InterviewService, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<ModalInterviewComponent>) { }

  ngOnInit(): void { }

  // Leave feedback function
  feedback(feedback: string, id: number){
    this.interviewService.feedbackInterview(feedback, id).subscribe({
      next: (response: any) => {
        this.openSnackBar('Feedback guardado', '');
        this.data.interview.feedback = response.feedback;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('There was an error!', error);
      }
    });
  }

  // Edit interview
  editInterview(){

    // Format date to remove timezone and make it compatible with the spring boot backend
    this.data.interview.interview_date
    let isoDateTime = new Date(this.interviewDate.getTime() - (this.interviewDate.getTimezoneOffset() * 60000)).toISOString().slice(0, this.interviewDate.toISOString().length - 1)

    //date: string, candidateid:number, interviewerid:number, selectionid:number
    // New object to send data to backend
    let interviewRequest: any = {
      candidateId: this.editInterviewCandidate.id,
      interviewerId: this.editInterviewAppUser.id,
      selectionId: this.editInterviewSelection.id,
      date: isoDateTime,
      status: this.interviewStatus,
      feedback: this.interviewFeedback
    }
    //isoDateTime, this.data.interview.id, this.editInterviewCandidate.id, this.editInterviewAppUser.id, this.editInterviewSelection.id
    this.interviewService.editInterview(this.data.interview.id, interviewRequest).subscribe({
      next: (response: any) => {
        this.openSnackBar('¡Entrevista editada!', '');

        // Update table row with data from the backend
        this.data.interview.id = response.id;
        this.data.interview.candidate = response.candidate;
        this.data.interview.interviewer = response.interviewer;
        this.data.interview.selection = response.selection;
        this.data.interview.feedback = response.feedback;
        this.data.interview.interview_date = response.interview_date;
        this.data.interview.status = response.status;
        this.data.interview.creation_date = response.creation_date;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('There was an error!', error);
      }
    });
  }

  confirmDelete() {
    // If user clic accept, it calls the function to close the dialog returning false, that will trigger the delete on parent component
    if(confirm("¿Seguro de que quieres borrar la entrevista?")){
      this.closeDialog(false);
    }
  }

  // Needs to add public dialogRef: MatDialogRef<ModalUserComponent> into the constructor
  // Function to close the dialog. It can return true or false
  closeDialog(choice:boolean) {
      this.dialogRef.close(choice);
  }

  // Snackbar config
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
