import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionService } from 'src/app/_services/selection.service';
import {Selection} from 'src/app/model/selection';
// Imports for the table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-selection',
  templateUrl: './list-selection.component.html',
  styleUrls: ['./list-selection.component.css']
})
export class ListSelectionComponent implements OnInit {
  selections: any[] = [];

  displayedColumns: string[] = ['id', 'start_date', 'end_date', 'name', 'description', 'requirements', 'location', 'sector', 'status', 'project_id', 'remote'];
  dataSource: MatTableDataSource<Selection>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private selectionService:SelectionService) {
    this.dataSource = new MatTableDataSource(this.getAllSelections());
  }

   // Material table
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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

  //Retrieve all selections from the backend
  public getAllSelections():Selection[] {
    let data: Selection[] = [];
    this.selectionService.getAllSelections().subscribe({
      next: (response: Selection[]) => {
        console.log(response);
        data = response;
        // Initialize datasource with response from backend
        this.dataSource.data = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
    return data;
  }

  public returnUndefined(string: string):string {

    if(!string) {
      return "Sin fecha";
    }else{
      return string
     }
  }
}
