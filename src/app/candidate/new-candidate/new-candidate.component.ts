import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';

@Component({
  selector: 'app-new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.css']
})
export class NewCandidateComponent implements OnInit
{
  newCandidateForm: any =
  {
    name: null,
    surname: null,
    email: null,
    skills: null,
    studies: null,
    location: null,
    experience: null
  };

  newCandidateFailed = false;

  newCandidateSuccess = false;

  errorMessage = "";

  constructor(private candidate:CandidateService) { }

  ngOnInit(): void {
  }

  submit(): void
  {
    const {name, surname, email, skills, studies, location, experience} = this.newCandidateForm;
    this.candidate.new(name, surname, email, skills, studies, location, experience).subscribe(
    {
      next: data =>
      {
        this.newCandidateFailed = false;
        this.newCandidateSuccess = true;
        console.log(data);
      },
      error: err =>
      {
        this.newCandidateFailed = true;
        this.newCandidateSuccess = false;
        this.errorMessage = err.error.message;
      }
    });
  }
}