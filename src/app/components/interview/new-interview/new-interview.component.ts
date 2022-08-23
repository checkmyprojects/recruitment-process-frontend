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

  @Output() sendDataToInterview = new EventEmitter();
  sendNewDataToInterviewList(data: any){
    this.sendDataToInterview.emit(data)
  }

  newInterviewView = true;

  newInterviewCandidate: any | undefined;
  getCandidate($event: any) {this.newInterviewCandidate = $event;}

  newInterviewSelection: any | undefined;
  getSelection($event: any) {this.newInterviewSelection = $event;}

  newInterviewAppUser: any | undefined;
  getInterviewer($event: any) {this.newInterviewAppUser = $event;}

  newInterviewDate: Date | undefined;

  // Date picker minimum date is now
  minDate = new Date();

  constructor(private interviewService: InterviewService, private _snackBar: MatSnackBar){}

  ngOnInit(): void { }

  scroll(el: HTMLElement, panel: MatExpansionPanel) {
    panel.open();

    // small delay to make time for open panel animation to end
    setTimeout(() => {
      el.scrollIntoView();
    }, 130);
  }
  createInterview(){

    if(this.newInterviewDate && this.newInterviewAppUser && this.newInterviewCandidate && this.newInterviewSelection){
      // Convert date to ISO including timezone offset
      // Remove the last letter, a Z that makes backend with LocalDateTime break
      let isoDateTime = new Date(this.newInterviewDate.getTime() - (this.newInterviewDate.getTimezoneOffset() * 60000)).toISOString().slice(0, this.newInterviewDate.toISOString().length - 1)

      this.interviewService.registerNewInterview(isoDateTime, this.newInterviewCandidate.id, this.newInterviewAppUser.id, this.newInterviewSelection.id).subscribe({
        next: (response: any) => {
          this.openSnackBar('¡Entrevista creada con éxito!', '');
          this.newInterviewCandidate = undefined;
          this.newInterviewSelection = undefined;
          this.newInterviewAppUser = undefined;
          this.newInterviewDate = undefined;
          console.log(response);
          this.sendNewDataToInterviewList(response);

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          console.error('There was an error!', error);
        }
      });
    }
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
