import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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


  newInterviewForm: FormGroup | any;

  constructor() { }

  ngOnInit(): void {

    this.newInterviewForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4),]),
      surname: new FormControl('', [Validators.required, Validators.minLength(4),]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      skills: new FormControl('', [Validators.required, Validators.minLength(4),]),
      studies: new FormControl('', [Validators.required, Validators.minLength(4),]),
      location: new FormControl('', [Validators.required, Validators.minLength(4),]),
      experience: new FormControl('', [Validators.required,]),
      state: new FormControl('', [Validators.required, Validators.minLength(4),]),
    });

  }

}
