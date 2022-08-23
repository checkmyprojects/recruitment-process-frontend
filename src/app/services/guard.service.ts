import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService
{
  constructor(private token:TokenStorageService, private router:Router){}

  isLogged()
  {
    if(this.token.getToken() == null)
      this.router.navigate(["login"]);
      //roles.includes('ROLE_ADMIN') || roles.includes('ROLE_PEOPLE') || roles.includes('ROLE_BUSINESS') || roles.includes('ROLE_INTERVIEWER');
  }

  isAdmin()
  {
    let b = false;
    const t = this.token.getToken();
    if(t)
      b = this.token.getUser().roles.includes("ROLE_ADMIN");
    if(!b)
      this.router.navigate(["login"]);
  }

  isPeople()
  {
    let b = false;
    const t = this.token.getToken();
    if(t)
      b = this.token.getUser().roles.includes("ROLE_PEOPLE");
    if(!b)
      this.router.navigate(["login"]);
  }

  isInterviewer()
  {
    let b = false;
    const t = this.token.getToken();
    if(t)
      b = this.token.getUser().roles.includes("ROLE_INTERVIEWER");
    if(!b)
      this.router.navigate(["login"]);
  }

  isBusiness()
  {
    let b = false;
    const t = this.token.getToken();
    if(t)
      b = this.token.getUser().roles.includes("ROLE_BUSINESS");
    if(!b)
      this.router.navigate(["login"]);
  }
}