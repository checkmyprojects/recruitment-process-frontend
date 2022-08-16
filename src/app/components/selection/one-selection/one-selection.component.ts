import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-one-selection]',
  templateUrl: './one-selection.component.html',
  styleUrls: ['./one-selection.component.css']
})
export class OneSelectionComponent implements OnInit {

  isEdit: boolean = false;
  isDeleted: boolean = false;
  @Input() selection!: any;


  constructor() { }

  ngOnInit(): void {
  }

  isEditToggle() {
    this.isEdit = !this.isEdit;
}
}
