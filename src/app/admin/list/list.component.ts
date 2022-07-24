import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: '[app-list]',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isEdit: boolean = false;
  isDeleted: boolean = false;
  @Input() user!: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  public arrayToString(roles: any[]){
    // let string : String = '';
    let rolesList: any[] = [];
    roles.forEach((role)=>rolesList.push(role.name));
    // roles.forEach((role)=>string+=role.name.toString());
    // console.log(string);
    // console.log(rolesList.join(", "));
    return rolesList.join(", ");
  }

  isEditToggle() {
    this.isEdit = !this.isEdit;    
  }

  public deleteAppUserById(id:string){
    this.adminService.deleteAppUserById(id).subscribe({
      next: response => {
        this.isDeleted = true;
        console.log(`Deleted AppUser with ID: ${id}`)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

}
