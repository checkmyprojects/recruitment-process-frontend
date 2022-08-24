import jsPDF from 'jspdf';
import { CandidatesService } from '../../../services/candidates.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Candidate } from 'src/app/model/candidate';
import {MatDialog} from '@angular/material/dialog';
import html2canvas from 'html2canvas';


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

  Candidates =[
    {id: 0,
    name: "",
    surname: "",
    email: "",
    skills: "",
    studies: "",
    location: "",
    experience: 0,
    state: ""}
  ];

  displayedColumns: string[] = ['state', 'name', 'surname',  'location', 'email', 'studies', 'experience', 'skills', 'create' ];
  dataSource: MatTableDataSource<Candidate>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // This value is setted when component is called from new interview component
  @Input() newInterviewView:boolean | undefined;

  // Function to send current row data to interview view
  @Output() sendDataToInterview = new EventEmitter();
  sendRowDataToInterview(row: any){
    // Scroll to top of the page when selecting a candidate
    window.scrollTo(0, 0);
    this.sendDataToInterview.emit(row)
  }


  constructor(private candidatesService:CandidatesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.getAllCandidates());
  }

  downloadPDF(){
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
  };
  html2canvas(DATA, options).then((canvas) => {

    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((docResult) => {
    docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
  });
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

  ngOnInit(): void {
    // If this component is not called from new interview, remove last table column (button to add it to new interview)
    if(!this.newInterviewView){
      // this.displayedColumns.splice(9,1);
      this.displayedColumns.pop();
    }
  }

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
