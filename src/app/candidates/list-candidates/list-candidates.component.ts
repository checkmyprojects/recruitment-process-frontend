import { CandidatesService } from './../../_services/candidates.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.css']
})
export class ListCandidatesComponent implements OnInit {
  candidates: any[] = [];

  constructor(private candidatesService:CandidatesService) { }

  ngOnInit(): void {
    this.getCandidates();
    console.log(this.candidates);
  }

  public getCandidates():void {
    this.candidatesService.getCandidates().subscribe({
      next: (response: Object[]) => {
        this.candidates = response;
        console.log(this.candidates);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }

    })
  }
}
