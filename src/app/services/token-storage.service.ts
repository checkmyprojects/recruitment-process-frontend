import { Injectable } from '@angular/core';

// auth-token is where we save the token in session storage
const TOKEN_KEY = 'auth-token';
// auth-user is where we save the user info in session storage
// {
//   "id": 1,
//   "username": "user",
//   "email": "user@mail.com",
//   "roles": [
//       "ROLE_USER"
//   ],
//   "tokenType": "Bearer",
//   "accessToken": "token.for.the-logged_user_from_springboot"
// }
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
