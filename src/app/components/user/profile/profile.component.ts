import { Component, OnInit } from '@angular/core';
import { GuardService } from 'src/app/services/guard.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  constructor(private token: TokenStorageService, guard: GuardService)
  {
    guard.isLogged();
  }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

}
