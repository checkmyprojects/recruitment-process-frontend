import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'dashboard.component',
  styleUrls: ['dashboard.component.css'],
  templateUrl: 'dashboard.component.html',

})


export class DashboardComponent implements OnInit {

  selected: Date | null | undefined;

  roles: string[] = [];

  isLoggedIn = false;
  showAdminBoard = false;
  showCandidatesBoard = false;
  showBusinessBoard = false;
  showInterviewerBoard = false;
  showSelectionBoard = false;
  username?: string;
  email?: string;




  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if(this.roles.includes('ROLE_ADMIN')){
        this.showAdminBoard = true;
      }if(this.roles.includes('ROLE_PEOPLE') || this.roles.includes('ROLE_ADMIN')){
        this.showCandidatesBoard = true;
        this.showInterviewerBoard = true;
        this.showSelectionBoard = true;
      }if(this.roles.includes('ROLE_BUSINESS') || this.roles.includes('ROLE_ADMIN')){
        this.showBusinessBoard = true;
      }if(this.roles.includes('ROLE_INTERVIEWER')){
        this.showInterviewerBoard = true;
      }

      this.email = user.email;
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}

