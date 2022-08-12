import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUsers } from '../model/app-users';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllAppUsers(): Observable<Object[]>{
    return this.http.get<Object[]>(`${this.apiServerUrl}/api/admin/users`);
  }
  public getAllMyAppUsers(): Observable<AppUsers[]>{
    return this.http.get<AppUsers[]>(`${this.apiServerUrl}/api/admin/users`);
  }

  public getAppUserById(id: string): Observable<Object>{
    return this.http.get<Object>(`${this.apiServerUrl}/api/admin/id/${id}`);
  }

  public updateAppUsers(user: AppUsers): Observable<AppUsers>{
    return this.http.put<AppUsers>(`${this.apiServerUrl}/api/admin/edit`, user);
  }

  public deleteAppUserById(id: string){
    return this.http.delete(`${this.apiServerUrl}/api/admin/delete/${id}`);
  }

  public getAllAppUsersParse(): AppUser[]{
    console.log("TEST SERVICE NUEVO");

    let usersList: any[] = [];
    let appUsers:AppUser[] = [];
    this.getAllAppUsers().subscribe({
      next: (response: Object[]) => {
        console.log("TEST INTERNO");
        usersList = response;
        // Convert response into AppUser format
        usersList.forEach((user)=> {

          // let roles: string[] = [];
          // // parse all roles names into a array of strings
          // user.roles.forEach((role: any)=>{
          //   if(role.name === "ROLE_ADMIN"){
          //     roles.push("admin");
          //   }else if(role.name === "ROLE_BUSINESS"){
          //     roles.push("business");
          //   }else if(role.name === "ROLE_INTERVIEWER"){
          //     roles.push("interview");
          //   }else if(role.name === "ROLE_PEOPLE"){
          //     roles.push("people");
          //   }
          // })
          // create new AppUser with all data and push it into array
          let appUser:AppUser = new AppUser(user.id, user.name, user.username, user.email, this.rolesObjectToRolesList(user.roles), user.active);
          appUsers.push(appUser);
        })
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
    return appUsers;
  }

  public rolesObjectToRolesList(roles: any[]){
    let rolesList: string[] = [];
    // parse all roles names into a array of strings
    roles.forEach((role: any)=>{
      if(role.name === "ROLE_ADMIN"){
        rolesList.push("admin");
      }else if(role.name === "ROLE_BUSINESS"){
        rolesList.push("business");
      }else if(role.name === "ROLE_INTERVIEWER"){
        rolesList.push("interview");
      }else if(role.name === "ROLE_PEOPLE"){
        rolesList.push("people");
      }
    })
    return rolesList;
  }
}
