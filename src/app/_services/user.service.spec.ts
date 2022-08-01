import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [ UserService ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPublicContent() is a GET request and returns data', () => {
    const contentPublic:string = 'public';

    service.getPublicContent().subscribe((res) => {
      expect(res).toEqual(contentPublic);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/test/all');
    expect(req.request.method).toEqual("GET");
    req.flush(contentPublic);

    httpMock.verify();
  });

  it('getUserBoard() is a GET request and returns data', () => {
    const contentUser:string = 'public';

    service.getUserBoard().subscribe((res) => {
      expect(res).toEqual(contentUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/test/user');
    expect(req.request.method).toEqual("GET");
    req.flush(contentUser);

    httpMock.verify();
  });

  it('getModeratorBoard() is a GET request and returns data', () => {
    const contentMod:string = 'public';

    service.getModeratorBoard().subscribe((res) => {
      expect(res).toEqual(contentMod);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/test/mod');
    expect(req.request.method).toEqual("GET");
    req.flush(contentMod);

    httpMock.verify();
  });

  it('getAdminBoard() is a GET request and returns data', () => {
    const contentAdmin:string = 'public';

    service.getAdminBoard().subscribe((res) => {
      expect(res).toEqual(contentAdmin);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/test/admin');
    expect(req.request.method).toEqual("GET");
    req.flush(contentAdmin);

    httpMock.verify();
  });

});
