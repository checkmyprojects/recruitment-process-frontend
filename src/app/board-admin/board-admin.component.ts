import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AdminService } from '../_services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  // These Components are role-based. But authorization will be processed by back-end.
  // We only need to call UserService methods:
  
  //     getUserBoard()
  //     getModeratorBoard()
  //     getAdminBoard()

  content?: string;

  public usersList: any[] = [];

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    this.getAllAppUsers();
  }

  public getAllAppUsers(): void{
    this.adminService.getAllAppUsers().subscribe({
      next: (response: Object[]) => {
        this.usersList = response;
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public arrayToString(roles: any[]){
    // let string : String = '';
    let rolesList: any[] = [];
    roles.forEach((role)=>rolesList.push(role.name));
    // roles.forEach((role)=>string+=role.name.toString());
    // console.log(string);
    console.log(rolesList.join(", "));
    return rolesList.join(", ");
  }

}
