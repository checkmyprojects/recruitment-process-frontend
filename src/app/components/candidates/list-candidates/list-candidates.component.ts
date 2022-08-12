import { CandidatesService } from '../../../services/candidates.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Candidate } from 'src/app/model/candidate';
import {MatDialog} from '@angular/material/dialog';

// Imports for the table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalCandidatesComponent } from '../modal-candidates/modal-candidates.component';
import { ModalCandidateNewComponent } from '../modal-candidate-new/modal-candidate-new.component';

@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.css']
})
export class ListCandidatesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'state', 'name', 'surname',  'location', 'email', 'studies', 'experience', 'skills' ];
  dataSource: MatTableDataSource<Candidate>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private candidatesService:CandidatesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.getAllCandidates());
  }

  //Open modal to edit candidate
  openDialog(row: Candidate) {
    const dialogRef = this.dialog.open(ModalCandidatesComponent,{
      data: { candidate: row},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false){
        //Delete candidate from angular array
        this.dataSource.data = this.dataSource.data.filter(item => item !== row);
        // API call to delete candidate by id
        this.deleteCandidateById(row.id.toString())
      }else if (result === true){

      }
    });
  }

  //New empty Candidate to add when creating new candidate
  newCandidate: Candidate = {
    id: 0,
    name: "",
    surname: "",
    email: "",
    skills: "",
    studies: "",
    location: "",
    experience: 0,
    state: "",
    hired: false,
    interviews: [],
  }

  //Open modal for new candidate
  openDialogNewCandidate() {
    const dialogRef = this.dialog.open(ModalCandidateNewComponent,{
      data: { candidate: this.newCandidate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dataSource.data = [...this.dataSource.data, this.newCandidate];

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

  ngOnInit(): void {}

  public getAllCandidates():Candidate[] {
    let data: Candidate[] = [];
    this.candidatesService.getAllCandidates().subscribe({
      next: (response: Candidate[]) => {
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

  public deleteCandidateById(id:string){
    this.candidatesService.deleteCandidateById(id).subscribe({
      next: response => {
        console.log(`Deleted Candidate with ID: ${id}`)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
