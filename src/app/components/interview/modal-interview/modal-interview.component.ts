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

  editInterviewCandidate: any = this.data.interview.candidate;
  getCandidate($event: any) {this.editInterviewCandidate = $event;}

  editInterviewSelection: any = this.data.interview.selection;
  getSelection($event: any) {this.editInterviewSelection = $event;}

  editInterviewAppUser: any = this.data.interview.interviewer;
  getInterviewer($event: any) {this.editInterviewAppUser = $event;}

  interviewDate: Date = new Date(this.data.interview.interview_date);

  // Date picker minimum date is now
  minDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {interview: Interview}, private interviewService: InterviewService, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<ModalInterviewComponent>) { }

  ngOnInit(): void {
    // this.dialogRef.updateSize('80%', '80%');
  }

  scroll(el: HTMLElement, panel: MatExpansionPanel) {
    panel.open();

    // small delay to make time for open panel animation to end
    setTimeout(() => {
      el.scrollIntoView();
    }, 130);
  }

  feedback(feedback: string, id: number){
    this.interviewService.feedbackInterview(feedback, id).subscribe({
      next: (response: any) => {
        this.openSnackBar('Feedback guardado', '');
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('There was an error!', error);
      }
    });
  }

  editInterview(){

    this.data.interview.interview_date
    let isoDateTime = new Date(this.interviewDate.getTime() - (this.interviewDate.getTimezoneOffset() * 60000)).toISOString().slice(0, this.interviewDate.toISOString().length - 1)

    this.interviewService.editInterview(isoDateTime, this.data.interview.id, this.editInterviewCandidate.id, this.editInterviewAppUser.id, this.editInterviewSelection.id).subscribe({
      next: (response: any) => {
        this.openSnackBar('¡Entrevista editada!', '');
        this.data.interview.interview_date = response.interview_date;
        this.data.interview.id = response.id;
        this.data.interview.candidate = response.candidate;
        this.data.interview.selection = response.selection;
        this.data.interview.interviewer = response.interviewer;
        this.data.interview.feedback = response.feedback;
        this.data.interview.creation_date = response.creation_date;
        console.log(response);
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
