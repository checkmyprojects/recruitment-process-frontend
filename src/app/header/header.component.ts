import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showCandidatesBoard = this.roles.includes('ROLE_PEOPLE');
      // this.showBusinessBoard = this.roles.includes('ROLE_BUSINESS');
      // this.showInterviewerBoard = this.roles.includes('ROLE_INTERVIEWER');

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
