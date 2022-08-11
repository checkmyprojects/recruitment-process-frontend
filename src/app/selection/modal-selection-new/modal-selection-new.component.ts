import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Selection } from 'src/app/model/selection';
import { SelectionService } from 'src/app/_services/selection.service';

@Component({
  selector: 'app-modal-selection-new',
  templateUrl: './modal-selection-new.component.html',
  styleUrls: ['./modal-selection-new.component.css']
})
export class ModalSelectionNewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {selection: Selection}, private selectionService: SelectionService, public dialogRef: MatDialogRef<ModalSelectionNewComponent>) { }

newSelection: any = {
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
    remote: true
}

newSelectionForm: FormGroup | any;

  ngOnInit(): void {
    this.newSelectionForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      // end_date: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(4),]),
      description: new FormControl('', [Validators.required, Validators.minLength(4),]),
      requirements: new FormControl('', [Validators.required, Validators.minLength(4),]),
      location: new FormControl('', [Validators.required, Validators.minLength(4),]),
      sector: new FormControl('', [Validators.required, Validators.minLength(4),]),
      status: new FormControl('', [Validators.required, Validators.minLength(4),]),
      priority: new FormControl('', [Validators.required, Validators.minLength(4),]),
      project_id: new FormControl('', [Validators.required]),
      // remote: new FormControl('', [Validators.required]),
      remote: new FormControl('',),

    });
  }

  saveSelection(){
    this.selectionService.registerNewSelection(this.newSelection).subscribe({
      next: response => {
        this.data.selection.id = response.id;
        this.data.selection.created_by = response.created_by;
        this.data.selection.start_date = response.start_date;
        this.data.selection.end_date = response.end_date;
        this.data.selection.name = response.name;
        this.data.selection.description = response.description;
        this.data.selection.requirements = response.requirements;
        this.data.selection.location = response.location;
        this.data.selection.sector = response.sector;
        this.data.selection.status = response.status;
        this.data.selection.priority = response.priority;
        this.data.selection.project_id = response.project_id;
        this.data.selection.remote = response.remote;
        this.data.selection.interviews = response.interviews;
      },
      error: (error: HttpErrorResponse) =>  {
        alert(error.message);
        console.error('There was an error!', error);
      }
  });
}
}
