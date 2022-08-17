import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-new-interview',
  templateUrl: './new-interview.component.html',
  styleUrls: ['./new-interview.component.css']
})
export class NewInterviewComponent implements OnInit {

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

  constructor(private interviewService: InterviewService) { }

  ngOnInit(): void { }

  createInterview(){

    if(this.newInterviewDate && this.newInterviewAppUser && this.newInterviewCandidate && this.newInterviewSelection){
      // Convert date to ISO including timezone offset
      // Remove the last letter, a Z that makes backend with LocalDateTime break
      let isoDateTime = new Date(this.newInterviewDate.getTime() - (this.newInterviewDate.getTimezoneOffset() * 60000)).toISOString().slice(0, this.newInterviewDate.toISOString().length - 1)

      this.interviewService.registerNewInterview(isoDateTime, this.newInterviewCandidate.id, this.newInterviewAppUser.id, this.newInterviewSelection.id).subscribe({
        next: (response: any) => {
          this.newInterviewCandidate = undefined;
          this.newInterviewSelection = undefined;
          this.newInterviewAppUser = undefined;
          this.newInterviewDate = undefined;
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          console.error('There was an error!', error);
        }
      });
    }
  }

}
