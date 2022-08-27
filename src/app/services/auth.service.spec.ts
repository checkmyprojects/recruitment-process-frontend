import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  // Localstorage mock
  let localStore = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // Mock localstorage
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
  });

    it('should be created', () => {
      expect(service).toBeTruthy();
  });

  it('signin should be a post request to http://localhost:8080/api/auth/signin url', () => {
    
    service.login("user", "password").subscribe((res) => {
      expect(res).toEqual("Log in successful");
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/signin');
    expect(req.request.method).toEqual("POST");
    req.flush("Log in successful");

    httpMock.verify();
  });

  it('signup should be a post request to http://localhost:8080/api/auth/signup url', () => {
    
    service.register("username", "email", "password").subscribe((res) => {
      expect(res).toEqual("Log in successful");
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/signup');
    expect(req.request.method).toEqual("POST");
    req.flush("Log in successful");

    httpMock.verify();
  });

  it('registerUser should be a post request to http://localhost:8080/api/auth/signup url', () => {
    
    let newAppUser: any = {
      name: "",
      username: "",
      password: "",
      email: "",
      role: ["admin", "people"]
    }

    service.registerNewUser(newAppUser).subscribe((res) => {
      expect(res).toEqual(newAppUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/signup');
    expect(req.request.method).toEqual("POST");
    req.flush(newAppUser);

    httpMock.verify();
  });

});