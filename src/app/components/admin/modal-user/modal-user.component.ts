import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppUsers } from 'src/app/model/app-users';
import { AdminService } from 'src/app/services/admin.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  // public dialogRef: MatDialogRef<ModalUserComponent> allow to use dialogref in the component
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: AppUsers}, private adminService: AdminService, public dialogRef: MatDialogRef<ModalUserComponent>, private tokenStorageService: TokenStorageService, private _snackBar: MatSnackBar) { }

  editUserForm: FormGroup | any;

  isLoggedIn = false;

  // used to prevent deletion of current logged user
  isThisMe: boolean = false;

  // Listener for enter key
  // on enter key press, save user and close dialog
  @HostListener('window:keyup.Enter', ['$event'])
  onDialogClick(event: KeyboardEvent): void {
    // save user
    this.saveUser();
    // close dialog returning true
    this.closeDialog(true);
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      if(user.id === this.data.user.id){
        // prevent logged user to delete own account
        this.isThisMe = true;
      }
    }

    // Initialize checkboxes with the user roles
    this.getMyRoles(this.data.user.roles);

    // Initialize oneRoleSelected with correct value
    this.rolesCheck();

    // Initialize Form
    this.editUserForm = new FormGroup({
      name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(4),]),
      username: new FormControl(this.data.user.username, [Validators.required, Validators.minLength(4),]),
      email: new FormControl(this.data.user.email, [Validators.required, Validators.email,Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),])
    });

  }

  // Save if user has the role inside of a variable to enable/disable the checkboxes
  role: any = {admin: false, people: false, business: false, interview: false}
  getMyRoles(roles: any){
    roles.forEach((role: any)=>{
      if (role.name === "ROLE_ADMIN"){
        this.role.admin = true;
      }
      if (role.name === "ROLE_PEOPLE"){
        this.role.people = true;
      }
      if (role.name === "ROLE_BUSINESS"){
        this.role.business = true;
      }
      if (role.name === "ROLE_INTERVIEWER"){
        this.role.interview = true;
      }
    })
  }

  // Make sure at least 1 roles is selected
  oneRoleSelected:boolean = false;
  rolesCheck(){
    let anyRoleSelected:boolean = false;
    if(this.role.admin === true || this.role.people === true || this.role.business === true || this.role.interview === true){
      this.oneRoleSelected = true;
    }else{
      this.oneRoleSelected = false;
    }
  }

  // Needs to add public dialogRef: MatDialogRef<ModalUserComponent> into the constructor
  // Function to close the dialog. It can return true or false
  closeDialog(choice:boolean) {
    this.dialogRef.close(choice);
  }

  confirmDelete() {
    // If user clic accept, it calls the function to close the dialog returning false, that will trigger the delete on parent component
    if(confirm("¿Seguro de que quieres borrar el usuario?")){
      this.closeDialog(false);
    }
  }

  // Copy user into a temporary one to edit later
  editedUser: AppUsers = JSON.parse(JSON.stringify(this.data.user));

  // Convert role from the checkboxes (true/false) and convert it into roles object
  getRolesFromCheckbox(role:any){
    let editedRoles: any = [];
    if(role.admin === true){
      editedRoles.push({"id": 0,"name": "ROLE_ADMIN"});
    }
    if(role.people === true){
      editedRoles.push({"id": 0,"name": "ROLE_PEOPLE"});
    }
    if(role.business === true){
      editedRoles.push({"id": 0,"name": "ROLE_BUSINESS"});
    }
    if(role.interview === true){
      editedRoles.push({"id": 0,"name": "ROLE_INTERVIEWER"});
    }
    return editedRoles;
  }

  // Save edited user overwriting original user
  saveUser(){
    // Remove user interviews to not send it to backend
    this.editedUser.interviews = [];

    // Need to set roles
    this.editedUser.roles = this.getRolesFromCheckbox(this.role);

    // Call API to save user
    // TODO Make sure that roles are not empty!!!!
    // If roles list is empty, use old roles
    // TODO: If no roles are selected, DO NOT allow to update user
    if(this.editedUser.roles.length === 0){
      // this.editedUser.roles = this.data.user.roles;
      this.data.user.roles.forEach((role:any)=>{
        this.editedUser.roles.push(role);
      })
    }
    this.adminService.updateAppUsers(this.editedUser).subscribe({
      next: response => {
        // Change angular user data to the new one received from api

        this.openSnackBar('¡Usuario editado con éxito!', '');
        this.data.user.id = response.id;
        this.data.user.name = response.name;
        this.data.user.username = response.username;
        this.data.user.email = response.email;
        this.data.user.roles = response.roles;
        this.data.user.active = response.active;
      },
      error: (error: HttpErrorResponse) => {
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
