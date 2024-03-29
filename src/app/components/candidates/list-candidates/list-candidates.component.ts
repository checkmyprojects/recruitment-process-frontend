import { CandidatesService } from '../../../services/candidates.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Candidate } from 'src/app/model/candidate';
import {MatDialog} from '@angular/material/dialog';

// Imports for the table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalCandidatesComponent } from '../modal-candidates/modal-candidates.component';
import { ModalCandidateNewComponent } from '../modal-candidate-new/modal-candidate-new.component';
// import * as pdfMake from "pdfmake/build/pdfmake";
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import * as XLSX from 'xlsx';
import { backgroundImage } from 'html2canvas/dist/types/css/property-descriptors/background-image';
@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.css']
})
export class ListCandidatesComponent implements OnInit {

  displayedColumns: string[] = ['state', 'name', 'surname',  'location', 'email', 'studies', 'experience', 'skills', 'pdf', 'create' ];
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
      // remove last column (add to interview) when this component is not called from interview view
      this.displayedColumns.pop();
    }
  }

  public getAllCandidates():Candidate[] {
    let data: Candidate[] = [];
    this.candidatesService.getAllCandidates().subscribe({
      next: (response: Candidate[]) => {
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

  // create PDF using pdfmake
  async printDoc(candidate: any){

    var dd = {
      pageMargins: [ 40, 20, 40, 60 ],
      "content": [
        {
          "nodeName": "DIV",
          "id": "page-wrap",
          "stack": [

            {
              "nodeName": "DIV",
              "id": "contact-info",
              "stack": [
                {
                  image: await this.getBase64ImageFromURL(
                    "assets/img/logoTeam.png"
                  ),
                  width: 100,
                  alignment: "right"
                },
                  {
                   "text":"Datos del candidato",
                   "nodeName": "P",
                   "alignment": "center",
                   "decoration": [
                     "underline"
                   ],
                   "margin":[
                    0,
                    21,
                    0,
                    10
                   ],
                   "bold": "true",
                   "fontSize": 20,
                   "style": [
                     "html-p"
                   ]
                 },
                {
                  "text": [
                    {
                      "text": " \n\n\nNOMBRE Y APELLIDO:",
                      "bold": true,
                      "fontSize": 13,
                      "margin": [
                        0,
                        5,
                        0,
                        10
                      ],
                      "style": [
                        "html-p",
                        "html-div",
                        "vcard"
                      ]
                    },
                    {
                      "text":   `\n${candidate.name} ${candidate.surname}`,
                      "nodeName": "SPAN",
                      "style": [
                        "html-span",
                        "html-p",
                        "html-div",
                        "vcard",
                        "tel"
                      ]
                    },
                    {
                      "text": " \n\n\n  UBICACIÓN:   ",
                      "bold": true,
                      "fontSize": 13,
                      "margin": [
                        0,
                        5,
                        0,
                        10
                      ],
                      "style": [
                        "html-p",
                        "html-div",
                        "vcard"
                      ]
                    },
                    {
                      "text":`\n${candidate.location}`,
                      "nodeName": "SPAN",
                      "style": [
                        "html-span",
                        "html-p",
                        "html-div",
                        "vcard",
                        "tel"
                      ]
                    },
                    {
                      "text": " \n\n\n  TELÉFONO:   ",
                      "bold": true,
                      "fontSize": 13,
                      "margin": [
                        0,
                        5,
                        0,
                        10
                      ],
                      "style": [
                        "html-p",
                        "html-div",
                        "vcard"
                      ]
                    },
                    {
                      "text":`\n${candidate.phone}`,
                      "nodeName": "SPAN",
                      "style": [
                        "html-span",
                        "html-p",
                        "html-div",
                        "vcard",
                        "tel"
                      ]
                    },
                    {
                      "text": " \n\n\nEMAIL:",
                      "bold": true,
                      "fontSize": 13,
                      "margin": [
                        0,
                        5,
                        0,
                        10
                      ],
                      "style": [
                        "html-p",
                        "html-div",
                        "vcard"
                      ]
                    },
                    {
                      "text":   `\n${candidate.email}`,
                      "nodeName": "SPAN",
                      "style": [
                        "html-span",
                        "html-p",
                        "html-div",
                        "vcard",
                        "tel"
                      ]
                    },
                    {
                      "text": " \n\n\n  HABILIDADES:   ",
                      "bold": true,
                      "fontSize": 13,
                      "margin": [
                        0,
                        5,
                        0,
                        10
                      ],
                      "style": [
                        "html-p",
                        "html-div",
                        "vcard"
                      ]
                    },
                    {
                      "text":`\n${candidate.skills}`,
                      "nodeName": "SPAN",
                      "style": [
                        "html-span",
                        "html-p",
                        "html-div",
                        "vcard",
                        "tel"
                      ]
                    },
                    {
                      "text": " \n\n\n  ESTUDIOS:   ",
                      "bold": true,
                      "fontSize": 13,
                      "margin": [
                        0,
                        5,
                        0,
                        10
                      ],
                      "style": [
                        "html-p",
                        "html-div",
                        "vcard"
                      ]
                    },
                    {
                      "text":`\n${candidate.studies}`,
                      "nodeName": "SPAN",
                      "style": [
                        "html-span",
                        "html-p",
                        "html-div",
                        "vcard",
                        "tel"
                      ]
                    },
                    {
                      "text": " \n\n\n  EXPERIENCIA:   ",
                      "bold": true,
                      "fontSize": 13,
                      "margin": [
                        0,
                        5,
                        0,
                        10
                      ],
                      "style": [
                        "html-p",
                        "html-div",
                        "vcard"
                      ]
                    },
                    {
                      "text":`\n${candidate.experience} años`,
                      "nodeName": "SPAN",
                      "style": [
                        "html-span",
                        "html-p",
                        "html-div",
                        "vcard",
                        "tel"
                      ]
                    },
                    {
                      "text": " \n\n\n  NOTAS:   ",
                      "bold": true,
                      "fontSize": 13,
                      "margin": [
                        0,
                        5,
                        0,
                        10
                      ],
                      "style": [
                        "html-p",
                        "html-div",
                        "vcard"
                      ]
                    },
                    {
                      "text":`\n${candidate.notes}`,
                      "nodeName": "SPAN",
                      "style": [
                        "html-span",
                        "html-p",
                        "html-div",
                        "vcard",
                        "tel"
                      ]
                    },
                  ],
                  "nodeName": "P",
                  "style": [
                    "html-p",
                    "html-div",
                    "vcard"
                  ]
                },
                {
                  "text": " ",
                  "style": [
                    "html-div",
                    "vcard"
                  ]
                }
              ]
            },
            {
              "text": " ",
              "style": [
                "html-div"
              ]
            }
          ]
        },
        {
          "text": " ",
          "style": []
        }
      ],
      "styles": {
        "green": {
          "color": "green"
        }
      }
    }

    pdfMake.createPdf(dd).download(`Datos de ${candidate.name} ${candidate.surname}`);
  }

  Candidate = [];
  name = 'ExcelSheet.xlsx';

  // Export to excel with SheetJS xlsx
  exportToExcel(): void {

    let element = document.getElementById('candidate-table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // remove last column data (create pdf)
    this.delete_cols(worksheet, 9,1)

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  // =======================================================================
  // Utility to remove range of columns from worksheet
  // Taken from sheetjs github, done by SheetJSDev
  // https://github.com/SheetJS/sheetjs/issues/1304#issuecomment-434206858
  clamp_range(range) {
    if(range.e.r >= (1<<20)) range.e.r = (1<<20)-1;
    if(range.e.c >= (1<<14)) range.e.c = (1<<14)-1;
    return range;
  }

  crefregex = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\(A-Za-z0-9])/g;

  /*
  deletes `ncols` cols STARTING WITH `start_col`
  usage: delete_cols(ws, 4, 3); // deletes columns E-G and shifts everything after G to the left by 3 columns
  */
  delete_cols(ws, start_col, ncols) {
    if(!ws) throw new Error("operation expects a worksheet");
    var dense = Array.isArray(ws);
    if(!ncols) ncols = 1;
    if(!start_col) start_col = 0;

    /* extract original range */
    var range = XLSX.utils.decode_range(ws["!ref"]);
    var R = 0, C = 0;

    var formula_cb = function($0, $1, $2, $3, $4, $5) {
      var _R = XLSX.utils.decode_row($5), _C = XLSX.utils.decode_col($3);
      if(_C >= start_col) {
        _C -= ncols;
        if(_C < start_col) return "#REF!";
      }
      return $1+($2=="$" ? $2+$3 : XLSX.utils.encode_col(_C))+($4=="$" ? $4+$5 : XLSX.utils.encode_row(_R));
    };

    var addr, naddr;
    for(C = start_col + ncols; C <= range.e.c; ++C) {
      for(R = range.s.r; R <= range.e.r; ++R) {
        addr = XLSX.utils.encode_cell({r:R, c:C});
        naddr = XLSX.utils.encode_cell({r:R, c:C - ncols});
        if(!ws[addr]) { delete ws[naddr]; continue; }
        if(ws[addr].f) ws[addr].f = ws[addr].f.replace(this.crefregex, formula_cb);
        ws[naddr] = ws[addr];
      }
    }
    for(C = range.e.c; C > range.e.c - ncols; --C) {
      for(R = range.s.r; R <= range.e.r; ++R) {
        addr = XLSX.utils.encode_cell({r:R, c:C});
        delete ws[addr];
      }
    }
    for(C = 0; C < start_col; ++C) {
      for(R = range.s.r; R <= range.e.r; ++R) {
        addr = XLSX.utils.encode_cell({r:R, c:C});
        if(ws[addr] && ws[addr].f) ws[addr].f = ws[addr].f.replace(this.crefregex, formula_cb);
      }
    }

    /* write new range */
    range.e.c -= ncols;
    if(range.e.c < range.s.c) range.e.c = range.s.c;
    ws["!ref"] = XLSX.utils.encode_range(this.clamp_range(range));

    /* merge cells */
    if(ws["!merges"]) ws["!merges"].forEach(function(merge, idx) {
      var mergerange;
      switch(typeof merge) {
        case 'string': mergerange = XLSX.utils.decode_range(merge); break;
        case 'object': mergerange = merge; break;
        default: throw new Error("Unexpected merge ref " + merge);
      }
      if(mergerange.s.c >= start_col) {
        mergerange.s.c = Math.max(mergerange.s.c - ncols, start_col);
        if(mergerange.e.c < start_col + ncols) { delete ws["!merges"][idx]; return; }
        mergerange.e.c -= ncols;
        if(mergerange.e.c < mergerange.s.c) { delete ws["!merges"][idx]; return; }
      } else if(mergerange.e.c >= start_col) mergerange.e.c = Math.max(mergerange.e.c - ncols, start_col);
      this.clamp_range(mergerange);
      ws["!merges"][idx] = mergerange;
    });
    if(ws["!merges"]) ws["!merges"] = ws["!merges"].filter(function(x) { return !!x; });

    /* cols */
    if(ws["!cols"]) ws["!cols"].splice(start_col, ncols);
  }
  // End utility to remove columns
  // =======================================================================
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}


