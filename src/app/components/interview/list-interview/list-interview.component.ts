import { HttpErrorResponse } from '@angular/common/http';
import { Interview } from '../../../model/interview';
import { MatDialog } from '@angular/material/dialog';
import { InterviewService } from 'src/app/services/interview.service';
import { Component, OnInit, ViewChild } from '@angular/core';

//Imports for the table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-interview',
  templateUrl: './list-interview.component.html',
  styleUrls: ['./list-interview.component.css']
})
export class ListInterviewComponent implements OnInit {

  displayedColumns: string[] = ['interview_date', 'candidate.name', 'interviewer.name','selection.name'];
  dataSource: MatTableDataSource<Interview>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private interviewService: InterviewService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.getAllInterviews());

    // Override filterPredicate with a custome one to allow
    // searching on nested properties
  this.dataSource.filterPredicate = (data, filter: string)  => {
    const accumulator = (currentTerm:any, key:any) => {
      return this.nestedFilterCheck(currentTerm, data, key);
    };
    const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
    // Transform the filter by converting it to lowercase and removing whitespace.
    const transformedFilter = filter.trim().toLowerCase();
    return dataStr.indexOf(transformedFilter) !== -1;
  };
  }

  openDialog() {

  }
//Custom filter for nested properties to work
  getProperty = (obj: any, path:any) => (
    path.split('.').reduce((o: any, p: any) => o && o[p], obj)
  )

  // Used along with datasource.filterPredicate to allow filtering nested properties
  nestedFilterCheck(search:any, data:any, key:any) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
   // Material table
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  //custom filter that uses getProperty function for nested properties sorting to work
    this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
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
    console.log(this.dataSource);

  }

  public getAllInterviews(): Interview[] {
    let data: Interview[] = [];
    this.interviewService.getAllInterviews().subscribe({
      next: (response: Interview[]) => {
        data = response;
        this.dataSource.data = response;
      },
      error: (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    })
      return data;
  }
}
