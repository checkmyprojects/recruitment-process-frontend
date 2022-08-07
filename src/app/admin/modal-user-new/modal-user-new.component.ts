import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppUsers } from 'src/app/model/app-users';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-modal-user-new',
  templateUrl: './modal-user-new.component.html',
  styleUrls: ['./modal-user-new.component.css']
})
export class ModalUserNewComponent implements OnInit {

  // TODO: Needs to validate all fields before sending to backend

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: AppUsers}, public dialogRef: MatDialogRef<ModalUserNewComponent>, private authService: AuthService) {
    
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


  // Password field is hidden by default
  hide = true;

  // emailFormControl = new FormControl(this.data.user.email, [Validators.required, Validators.email]);

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
    // TODO: Needs to validate all before sending to backend
    // ! Do not send if some fields are missing
    // ! Needs to control error (duplicate username or valid email)
    // this.data.user.id = 0;
    // this.data.user.name = this.newModalAppUser.name;
    // this.data.user.username = this.newModalAppUser.username;
    // this.data.user.email = this.newModalAppUser.email;
    // this.data.user.roles = this.newModalAppUser.roles;
    // this.data.user.active = this.newModalAppUser.active;
    
    // Get roles from checkbox
    this.newModalAppUser.role = this.getRolesFromCheckbox(this.role);

    // Call API to save user
    // TODO Make sure that roles are not empty!!!!
    // If roles list is empty, use old roles
    // TODO: If no roles are selected, DO NOT allow to update user
    this.authService.registerNewUser(this.newModalAppUser).subscribe({
      next: response => {
        // console.log("DATA NEW USER");
        // console.log(response);
        
        
        // Change angular user data to the new one received from api
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
    console.log(this.newModalAppUser);
  }

  // Convert role from the checkboxes (true/false) and convert it into roles object
  // getRolesFromCheckbox(role:any){
  //   let editedRoles: any = [];
  //   if(role.admin === true){
  //     editedRoles.push({"id": 0,"name": "ROLE_ADMIN"});
  //   }
  //   if(role.people === true){
  //     editedRoles.push({"id": 0,"name": "ROLE_PEOPLE"});
  //   }
  //   if(role.business === true){
  //     editedRoles.push({"id": 0,"name": "ROLE_BUSINESS"});
  //   }
  //   if(role.interview === true){
  //     editedRoles.push({"id": 0,"name": "ROLE_INTERVIEWER"});
  //   }
  //   return editedRoles;
  // }

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
}
