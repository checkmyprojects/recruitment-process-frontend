import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Selection } from 'src/app/model/selection';
import { SelectionService } from 'src/app/services/selection.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-modal-selection-new',
  templateUrl: './modal-selection-new.component.html',
  styleUrls: ['./modal-selection-new.component.css']
})
export class ModalSelectionNewComponent implements OnInit {

  minDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {selection: Selection}, private selectionService: SelectionService, public dialogRef: MatDialogRef<ModalSelectionNewComponent>, private _snackBar: MatSnackBar) { }

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
      remote: false
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
    // Convert date to keep only YYYY-MM-DD to preven frontend to send 1 day off to the backend because of date conversion
    let formDate = this.newSelectionForm.controls.start_date.value;
    let dateFormatted:string = `${formDate.getFullYear()}-${formDate.getMonth()+1}-${formDate.getDate()}`;
    this.newSelection.start_date = dateFormatted;

    this.selectionService.registerNewSelection(this.newSelection).subscribe({
      next: response => {
        this.openSnackBar('¡Proceso creado con éxito!', '');
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

horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'top';

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: 3000
  });
}

}
