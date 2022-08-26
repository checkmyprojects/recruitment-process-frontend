import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  loggedUser = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.loggedUser = this.tokenStorage.getUser().username;
      this.redirectToUserRolePage();
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        window.location.reload();
        this.redirectToUserRolePage();
      },
      error: err => {
        // this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  
  reloadPage(): void {
    window.location.reload();
    this.redirectToUserRolePage()
  }

  redirectToUserRolePage(){

    const adminRole: string = 'ROLE_ADMIN';
    const peopleRole: string = 'ROLE_PEOPLE';
    const interviewerRole: string = 'ROLE_INTERVIEWER';
    const businessRole: string = 'ROLE_BUSINESS';

    const userRoles = this.tokenStorage.getUser().roles;

    if(userRoles.includes(adminRole)){
      this.router.navigate(['/admin']);
    }
    if(userRoles.includes(peopleRole)){
      this.router.navigate(['/selection']);
    }
    if(userRoles.includes(interviewerRole)){
      this.router.navigate(['/interview']);
    }
    if(userRoles.includes(businessRole)){
      this.router.navigate(['/statistics']);
    }


  }

}