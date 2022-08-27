import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;
  // Localstorage mock
  

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);
    let sessionStorage = {};
    // Mock localstorage
    spyOn(window.sessionStorage, 'getItem').and.callFake((key) =>
      key in sessionStorage ? sessionStorage[key] : null
    );
    spyOn(window.sessionStorage, 'setItem').and.callFake(
      (key, value) => (sessionStorage[key] = value + '')
    );
    spyOn(window.sessionStorage, 'clear').and.callFake(() => (sessionStorage = {}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when signOut, sessionstorage should be empty', () => {
    
    service.signOut();
    expect(sessionStorage.getItem('auth-token')).toBeNull();
    expect(sessionStorage.getItem('auth-user')).toBeNull();
  });

  it('when saveUser, sessionstorage should have the user credentials saved', () => {

    let user = {id: 1, name: "name"}
    service.saveUser(user);
    expect(sessionStorage.getItem('auth-user')).toBe(JSON.stringify(user))
    expect(sessionStorage.getItem('auth-token')).toBeNull();
  });

  it('when getUser, sessionstorage should have the user credentials saved', () => {

    let user = {id: 1, name: "name"}
    sessionStorage.setItem('auth-user', JSON.stringify(user));
    let response = service.getUser();
    expect(response).toEqual(user);
  });

  it('when getToken, it should get the sessionStorage item', () => {

    let token = '123123123123123123123123'
    sessionStorage.setItem('auth-token', token)
    let response = service.getToken();
    expect(response).toBe(token);
    
  });

  it('when saveToken, it should save the token to sessionStorage', () => {

    let token = '123123123123123123123123'
    service.saveToken(token);
    expect(sessionStorage.getItem('auth-token')).toBe(token);
    
  });

});
