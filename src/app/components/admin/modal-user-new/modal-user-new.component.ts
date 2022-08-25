import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppUsers } from 'src/app/model/app-users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-user-new',
  templateUrl: './modal-user-new.component.html',
  styleUrls: ['./modal-user-new.component.css']
})
export class ModalUserNewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: AppUsers}, public dialogRef: MatDialogRef<ModalUserNewComponent>, private authService: AuthService, public snackBar: MatSnackBar) {

  }

  logit(){
    console.log(this.loginForm);

  }
  // Check if password and confirmPassword are the same
  passwordCheck(control:any):any{
    if (control.value != null){
      let conPass = control.value;
      let pass = control.root.get('password')
      if(pass){
        let password = pass.value;
        if(conPass !== "" && password !== ""){
          if(conPass !== password){
            return {
              passwordConfirmed: true
            }
          }else{
            return null;
          }
        }
      }
    }
  }
  oneRoleSelected:boolean = false;
  rolesCheck(){
    let anyRoleSelected:boolean = false;
    if(this.role.admin === true || this.role.people === true || this.role.business === true || this.role.interview === true){
      this.oneRoleSelected = true;
    }else{
      this.oneRoleSelected = false;
    }
  }

  // Hide/Show password
  hide = true;

  newModalAppUser: any = {
    name: "",
    username: "",
    password: "",
    email: "",
    role: [] // strings array, values could be: ["admin", "people", "interview", "business"]
  }

  loginForm: FormGroup | any;

  // Password confirmation
  passwordConfirm:string = "";

  // Roles for checkboxes
  role: any = {admin: false, people: false, business: false, interview: false}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4),]),
      username: new FormControl('', [Validators.required, Validators.minLength(4),]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), this.passwordCheck]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4), this.passwordCheck])
    });

    this.loginForm.controls.password.valueChanges.subscribe(
      (      _x: any)=>this.loginForm.controls.confirmPassword.updateValueAndValidity()
    )
  }

  // Used to close the dialog sending true or false
  closeDialog(choice:boolean) {
    this.dialogRef.close(choice);
  }

  confirmDelete() {
    // If user clic accept, it calls the function to close the dialog returning false, that will trigger the delete on parent component
    if(confirm("¿Seguro de que quieres borrar el usuario?")){
      this.closeDialog(false);
    }
  }

  saveUser(){

    // Get roles from checkbox
    this.newModalAppUser.role = this.getRolesFromCheckbox(this.role);

    // Call API to save user
    this.authService.registerNewUser(this.newModalAppUser).subscribe({
      next: response => {
        // Change angular user data to the new one received from api
        this.openSnackBar('¡Usuario creado con éxito!', '');
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

  getRolesFromCheckbox(role:any){
    let editedRoles: any = [];
    if(role.admin === true){
      editedRoles.push("admin");
    }
    if(role.people === true){
      editedRoles.push("people");
    }
    if(role.business === true){
      editedRoles.push("interview");
    }
    if(role.interview === true){
      editedRoles.push("business");
    }
    return editedRoles;
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
