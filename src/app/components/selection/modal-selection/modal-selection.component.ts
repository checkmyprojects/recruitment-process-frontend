import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectionService } from 'src/app/services/selection.service';
import { Selection } from 'src/app/model/selection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-selection',
  templateUrl: './modal-selection.component.html',
  styleUrls: ['./modal-selection.component.css']
})
export class ModalSelectionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {selection: Selection}, private selectionService: SelectionService, public dialogRef: MatDialogRef<ModalSelectionComponent>) { }

  editedSelection: Selection = JSON.parse(JSON.stringify(this.data.selection));
  editSelectionForm: FormGroup | any;

  ngOnInit(): void {
    console.log (this.data.selection)
    this.editSelectionForm = new FormGroup({
      start_date: new FormControl(this.data.selection.start_date, [Validators.required]),
      // end_date: new FormControl('', [Validators.required]),
      name: new FormControl(this.data.selection.name, [Validators.required, Validators.minLength(4),]),
      description: new FormControl(this.data.selection.description, [Validators.required, Validators.minLength(4),]),
      requirements: new FormControl(this.data.selection.requirements, [Validators.required, Validators.minLength(4),]),
      location: new FormControl(this.data.selection.location, [Validators.required, Validators.minLength(4),]),
      sector: new FormControl(this.data.selection.sector, [Validators.required, Validators.minLength(4),]),
      status: new FormControl(this.data.selection.status, [Validators.required, Validators.minLength(4),]),
      priority: new FormControl(this.data.selection.priority, [Validators.required, Validators.minLength(4),]),
      project_id: new FormControl(this.data.selection.project_id, [Validators.required]),
      // remote: new FormControl(this.data.selection., [Validators.required]),
      remote: new FormControl(this.data.selection.remote,),

    });
  }
  saveSelection(){

         this.data.selection.id = this.editedSelection.id;
         this.data.selection.created_by = this.editedSelection.created_by;
         this.data.selection.start_date = this.editedSelection.start_date;
         this.data.selection.end_date = this.editedSelection.end_date;
         this.data.selection.name = this.editedSelection.name;
         this.data.selection.description = this.editedSelection.description;
         this.data.selection.requirements = this.editedSelection.requirements;
         this.data.selection.location = this.editedSelection.location;
         this.data.selection.sector = this.editedSelection.sector;
         this.data.selection.status = this.editedSelection.status;
         this.data.selection.priority = this.editedSelection.priority;
         this.data.selection.project_id = this.editedSelection.project_id;
         this.data.selection.remote = this.editedSelection.remote;
         this.data.selection.interviews = this.editedSelection.interviews;

    // Get value from form and give it to newSelection

  //   this.selectionService.registerNewSelection(this.editedSelection).subscribe({
  //     next: response => {
  //       this.data.selection.id = response.id;
  //       this.data.selection.created_by = response.created_by;
  //       this.data.selection.start_date = response.start_date;
  //       this.data.selection.end_date = response.end_date;
  //       this.data.selection.name = response.name;
  //       this.data.selection.description = response.description;
  //       this.data.selection.requirements = response.requirements;
  //       this.data.selection.location = response.location;
  //       this.data.selection.sector = response.sector;
  //       this.data.selection.status = response.status;
  //       this.data.selection.priority = response.priority;
  //       this.data.selection.project_id = response.project_id;
  //       this.data.selection.remote = response.remote;
  //       this.data.selection.interviews = response.interviews;
  //     },
  //     error: (error: HttpErrorResponse) =>  {
  //       alert(error.message);
  //       console.error('There was an error!', error);
  //     }
  // });
}


}
