import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id: string | undefined;
  public user: any;

  form: any = {
    name: null,
    username: null,
    email: null,
    active: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private userService: UserService, private adminService: AdminService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    console.log(this.id);
    this.getAppUserById();
  }

  public getAppUserById(): any{
    if(!this.id){
      return;
    }
    this.adminService.getAppUserById(this.id).subscribe({
      next: (response: Object) => {
        this.openSnackBar('¡Usuario editado con éxito!', '');
        this.user = response;
        console.log(response);
        this.form.username = this.user.username;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
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

  onSubmit(): void {
    const { username, email, password } = this.form;

  }

}