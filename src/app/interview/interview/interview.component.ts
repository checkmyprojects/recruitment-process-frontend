import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'src/app/_services/interview.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit
{
  interviews?: Array<any>;

  constructor(private interviewService:InterviewService){}

  ngOnInit(): void
  {
    this.interviewService.getInterviews().subscribe((ivs:Object[])=>{this.interviews = ivs;});
  }
}