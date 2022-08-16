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

  newInterviewDate!: Date;

  minDate = new Date();

  logDate(){
    // console.log(this.newInterviewDate);
    // console.log(Date.parse(this.newInterviewDate.toString()));
    let isoDateTime = new Date(this.newInterviewDate.getTime() - (this.newInterviewDate.getTimezoneOffset() * 60000)).toISOString()
    console.log("MASSSSSS");
    console.log(isoDateTime);
    
    
    // console.log(this.newInterviewDate.toISOString());
    // console.log(this.newInterviewDate.toUTCString());
    // console.log(this.newInterviewDate.setMinutes(this.newInterviewDate.getMinutes() - (this.newInterviewDate.getTimezoneOffset())));
    // console.log(this.newInterviewDate.toISOString().slice(0, this.newInterviewDate.toISOString().length - 1));
  }

  constructor(private interviewService: InterviewService) { }

  ngOnInit(): void { }

  createInterview(){
    // console.log("PRUEBA");
    // console.log("date: " + this.newInterviewDate.toISOString().slice(0, this.newInterviewDate.toISOString().length - 1) + " candidateID: " + this.newInterviewCandidate.id + " InterviewerID: " + this.newInterviewAppUser.id +" SelectionID: " + this.newInterviewSelection.id);
    // let dateTime:Date = this.newInterviewDate;
    // dateTime.setMinutes(dateTime.getMinutes() - (dateTime.getTimezoneOffset()));
    // let isoDateTime = new Date(this.newInterviewDate.getTime() - (this.newInterviewDate.getTimezoneOffset() * 60000)).toISOString()

    // Convert date to ISO including timezone offset
    // Remove the las letter, a Z that makes backend with LocalDateTime break
    let isoDateTime = new Date(this.newInterviewDate.getTime() - (this.newInterviewDate.getTimezoneOffset() * 60000)).toISOString().slice(0, this.newInterviewDate.toISOString().length - 1)
    // this.interviewService.registerNewInterview(dateTime.toISOString().slice(0, this.newInterviewDate.toISOString().length - 1), this.newInterviewCandidate.id, this.newInterviewAppUser.id, this.newInterviewSelection.id).subscribe({
    this.interviewService.registerNewInterview(isoDateTime, this.newInterviewCandidate.id, this.newInterviewAppUser.id, this.newInterviewSelection.id).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('There was an error!', error);
      }
    });
  }

}
