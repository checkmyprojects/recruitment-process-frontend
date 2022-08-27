import { TestBed } from '@angular/core/testing';


import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllMyAppUsers should be a GET request to backend url', () => {
    const appUsers: any[] = [
      {
          "id": 1,
          "name": "myname",
          "username": "myusername",
          "roles": null
      }
    ] 

    service.getAllMyAppUsers().subscribe((res) => {
      expect(res).toEqual(appUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/admin/users');
    expect(req.request.method).toEqual("GET");
    expect(req.request.url).toBe('http://localhost:8080/api/admin/users');
    req.flush(appUsers);

    httpMock.verify();
  });

  it('getAllMyInterviewers should be a GET request to backend url', () => {
    const appUsers: any[] = [
      {
          "id": 1,
          "name": "myname",
          "username": "myusername",
          "roles": null
      }
    ] 

    service.getAllMyInterviewers().subscribe((res) => {
      expect(res).toEqual(appUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/admin/usersInterview');
    expect(req.request.method).toEqual("GET");
    expect(req.request.url).toBe('http://localhost:8080/api/admin/usersInterview');
    req.flush(appUsers);

    httpMock.verify();
  });

  it('getAppUserById should be a GET request to backend url', () => {
    const id = "1"

    service.getAppUserById(id).subscribe((res) => {
      
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/admin/id/${id}`);
    expect(req.request.method).toEqual("GET");
    expect(req.request.url).toBe(`http://localhost:8080/api/admin/id/${id}`);
    
    httpMock.verify();
  });

  it('updateAppUsers should be a GET request to backend url', () => {
    const appUsers: any = {
          "id": 1,
          "name": "myname",
          "username": "myusername",
          "roles": null
      }

    service.updateAppUsers(appUsers).subscribe((res) => {
      expect(res).toEqual(appUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/admin/edit');
    expect(req.request.method).toEqual("PUT");
    expect(req.request.url).toBe('http://localhost:8080/api/admin/edit');
    req.flush(appUsers);

    httpMock.verify();
  });

  it('deleteAppUserById should be a DELETE request to backend url', () => {
    const id = "1"

    service.deleteAppUserById(id).subscribe((res) => {
      
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/admin/delete/${id}`);
    expect(req.request.method).toEqual("DELETE");
    expect(req.request.url).toBe(`http://localhost:8080/api/admin/delete/${id}`);
    
    httpMock.verify();
  });
});
