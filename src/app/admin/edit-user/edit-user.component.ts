import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id: string | undefined;
  public user: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private adminService: AdminService) { }

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
        
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
