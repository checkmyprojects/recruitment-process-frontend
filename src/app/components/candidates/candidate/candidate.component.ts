import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-candidate]',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  isEdit: boolean = false;
  isDeleted: boolean = false;
  @Input() user!: any;

  constructor() { }

  ngOnInit(): void {
  }
  isEditToggle() {
    this.isEdit = !this.isEdit;
  }
}
