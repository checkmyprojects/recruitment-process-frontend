import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SelectionService } from 'src/app/_services/selection.service';

@Component({
  selector: 'app-list-selection',
  templateUrl: './list-selection.component.html',
  styleUrls: ['./list-selection.component.css']
})
export class ListSelectionComponent implements OnInit {
  selections: any[] = [];

  constructor(private selectionService:SelectionService) { }

  ngOnInit(): void {
    this.getSelections();
    console.log(this.selections);
  }

  public getSelections():void {
    this.selectionService.getSelections().subscribe({
      next: (response: Object[]) => {
        this.selections = response;
        console.log(this.selections);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }

    })
  }

}
