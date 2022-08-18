import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectionService } from 'src/app/services/selection.service';
import { Selection } from 'src/app/model/selection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-modal-selection',
  templateUrl: './modal-selection.component.html',
  styleUrls: ['./modal-selection.component.css']
})
export class ModalSelectionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {selection: Selection}, private selectionService: SelectionService, public dialogRef: MatDialogRef<ModalSelectionComponent>, private _snackBar: MatSnackBar) { }

  editedSelection: any = JSON.parse(JSON.stringify(this.data.selection));
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
    this.openSnackBar('¡Proceso editado con éxito!', '');
    // Remove created_by and interviews properties before sending to backend to prevent errors
    delete this.editedSelection.created_by;
    delete this.editedSelection.interviews;

    // Convert date to keep only YYYY-MM-DD to preven frontend to send 1 day off to the backend because of date conversion
    let formDate = this.editSelectionForm.controls.start_date.value;
    let dateFormatted:string = `${formDate.getFullYear()}-${formDate.getMonth()+1}-${formDate.getDate()}`;
    this.editedSelection.start_date = dateFormatted;


    this.selectionService.updateSelections(this.editedSelection).subscribe({
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
confirmDelete() {
  // If user clic accept, it calls the function to close the dialog returning false, that will trigger the delete on parent component
  if(confirm("¿Seguro de que quieres borrar el proceso de selección?")){
    this.closeDialog(false);
  }
}
// Needs to add public dialogRef: MatDialogRef<ModalUserComponent> into the constructor
  // Function to close the dialog. It can return true or false
closeDialog(choice:boolean) {
    this.dialogRef.close(choice);
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
