import { ModalSelectionNewComponent } from './../modal-selection-new/modal-selection-new.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SelectionService } from 'src/app/services/selection.service';
import {Selection} from 'src/app/model/selection';
// Imports for the table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-selection',
  templateUrl: './list-selection.component.html',
  styleUrls: ['./list-selection.component.css']
})
export class ListSelectionComponent implements OnInit {

  displayedColumns: string[] = ['id', 'start_date', 'end_date', 'name', 'description', 'requirements', 'location', 'sector', 'status', 'project_id', 'remote', 'create'];
  dataSource: MatTableDataSource<Selection>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // This value is setted when component is called from new interview component
  @Input() newInterviewView:boolean | undefined;

  // Function to send current row data to interview view
  @Output() sendDataToInterview = new EventEmitter();
  sendRowDataToInterview(row: any){
    this.sendDataToInterview.emit(row)
  }

  constructor(private selectionService:SelectionService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.getAllSelections());
  }


  newSelection: Selection = {
    id: 0,
    created_by: {
      id: 0,
      name: "",
      username: "",
      email: "",
      roles: [],
      interviews: [],
      active: true
    },
    start_date: "",
    end_date: "",
    name: "",
    description: "",
    requirements: "",
    location: "",
    sector: "",
    status: "",
    priority: "",
    project_id: 0,
    remote: true,
    interviews: []
}

  //Open modal for new selection
  openDialogNewSelection() {
    const dialogRef = this.dialog.open(ModalSelectionNewComponent,{
      data: { selection: this.newSelection }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dataSource.data = [...this.dataSource.data, this.newSelection];

     }
    });
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

    // If this component is not called from new interview, remove last table column (button to add it to new interview)
    if(!this.newInterviewView){
      this.displayedColumns.splice(10,1);
    }
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

  // If it has no end date, print "Sin fecha" instead
  public returnUndefined(string: string):string {
    if(!string) {
      return "Sin fecha";
    }else{
      return string
    }
  }
}
