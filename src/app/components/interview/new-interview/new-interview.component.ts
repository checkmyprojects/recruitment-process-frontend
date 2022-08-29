import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-new-interview',
  templateUrl: './new-interview.component.html',
  styleUrls: ['./new-interview.component.css']
})
export class NewInterviewComponent implements OnInit {

  // send data to parent component
  @Output() sendDataToInterview = new EventEmitter();
  sendNewDataToInterviewList(data: any){
    this.sendDataToInterview.emit(data)
  }

  newInterviewView = true;

  // get data from candidate lsit component
  newInterviewCandidate: any | undefined;
  getCandidate($event: any) {this.newInterviewCandidate = $event;}

  // get data from selection lsit component
  newInterviewSelection: any | undefined;
  getSelection($event: any) {this.newInterviewSelection = $event;}

  // get data from interviewer lsit component
  newInterviewAppUser: any | undefined;
  getInterviewer($event: any) {this.newInterviewAppUser = $event;}

  newInterviewDate: Date | undefined;

  newInterviewStatus: string | undefined;

  // Date picker minimum date is now
  minDate = new Date();

  constructor(private interviewService: InterviewService, private _snackBar: MatSnackBar){}

  ngOnInit(): void { }

  createInterview(){

    if(this.newInterviewDate && this.newInterviewAppUser && this.newInterviewCandidate && this.newInterviewSelection){
      // Convert date to ISO including timezone offset
      // Remove the last letter, a Z that makes backend with LocalDateTime break
      let isoDateTime = new Date(this.newInterviewDate.getTime() - (this.newInterviewDate.getTimezoneOffset() * 60000)).toISOString().slice(0, this.newInterviewDate.toISOString().length - 1)

      //date: string, candidateid:number, interviewerid:number, selectionid:number
      let interviewRequest: any = {
        candidateId: this.newInterviewCandidate.id,
        interviewerId: this.newInterviewAppUser.id,
        selectionId: this.newInterviewSelection.id,
        date: isoDateTime,
        status: this.newInterviewStatus,
        feedback: ""
      }

      this.interviewService.registerNewInterview(interviewRequest).subscribe({
        next: (response: any) => {
          this.openSnackBar('¡Entrevista creada con éxito!', '');

          // reset form data
          this.newInterviewCandidate = undefined;
          this.newInterviewSelection = undefined;
          this.newInterviewAppUser = undefined;
          this.newInterviewDate = undefined;

          // send backend data to parent component to insert it into the table
          this.sendNewDataToInterviewList(response);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          console.error('There was an error!', error);
        }
      });
    }
  }

  // Snackbar
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
