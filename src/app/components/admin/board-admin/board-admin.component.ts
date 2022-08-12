import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppUser } from '../../../model/appUser';
import { AppUsers } from '../../../model/app-users';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { ModalUserNewComponent } from '../modal-user-new/modal-user-new.component';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  // Material table
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'roles'];
  dataSource: MatTableDataSource<AppUsers>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // dataSource:AppUsers[] = [];
  constructor(public dialog: MatDialog, private userService: UserService, private adminService: AdminService) {
    this.dataSource = new MatTableDataSource(this.getAllMyAppUsers());
  }

  //  Material table
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

  ngOnInit(): void {}

  // Modal to edit AppUser
  openDialog(row: AppUsers) {
    const dialogRef = this.dialog.open(ModalUserComponent, {
      data: { user: row },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === false){
        console.log("BORRAR TODO");
        console.log(row);
        // Delete user from angular array
        this.dataSource.data = this.dataSource.data.filter(item => item !== row);

        // API call to delete user by id
        this.deleteAppUserById(row.id.toString())
      }else if(result === true){
        // It saves inside modal-user component

      }
    });
  }
  // New empty AppUser to add when creating new user
  newAppUser: AppUsers = {
    id: 0,
    name: "",
    username: "",
    email: "",
    roles: [],
    interviews: [],
    active: true
  }
  // Modal for new AppUser
  openDialogNewUser() {
    const dialogRef = this.dialog.open(ModalUserNewComponent, {
      data: { user: this.newAppUser },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === false){

      }else if(result === true){
        // It saves inside modal-user component
        // console.log(this.dataSource.data)
        // console.log(this.newAppUser);

        this.dataSource.data = [...this.dataSource.data, this.newAppUser];
      }
    });
  }

  public getAllMyAppUsers(): AppUsers[]{
    let data:any =[]
    this.adminService.getAllMyAppUsers().subscribe({
      next: (response: AppUsers[]) => {
        data = response;
        this.dataSource.data = response;

      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
    return data;
  }

  public deleteAppUserById(id:string){
    this.adminService.deleteAppUserById(id).subscribe({
      next: response => {
        console.log(`Deleted AppUser with ID: ${id}`)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }


  public rolesToSingleLetter(roles: any[]){
    // let string : String = '';
    let rolesList: any[] = [];
    roles.forEach((role)=>{
      if (role.name === "ROLE_ADMIN"){
        rolesList.push('A');
      }
      if (role.name === "ROLE_PEOPLE"){
        rolesList.push('P');
      }
      if (role.name === "ROLE_BUSINESS"){
        rolesList.push('N');
      }
      if (role.name === "ROLE_INTERVIEWER"){
        rolesList.push('E');
      }
    });
    return rolesList.sort().join(" ");
  }

  public rolesToShortNameLetter(roles: any[]){
    let rolesList: any[] = [];
    roles.forEach((role)=>{
      if (role.name === "ROLE_ADMIN"){
        rolesList.push('Administrador');
      }
      if (role.name === "ROLE_PEOPLE"){
        rolesList.push('People');
      }
      if (role.name === "ROLE_BUSINESS"){
        rolesList.push('Negocio');
      }
      if (role.name === "ROLE_INTERVIEWER"){
        rolesList.push('Entrevistador');
      }
    });
    return rolesList.sort().join(", ");
  }

}
