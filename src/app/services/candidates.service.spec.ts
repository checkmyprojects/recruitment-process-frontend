import { Candidate } from 'src/app/model/candidate';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CandidatesService } from './candidates.service';

describe('CandidatesService', () => {
  let service: CandidatesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CandidatesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCandidates should a GET request and returns data', () => {

    const candidate: any[] = [
      {
          "id": 1,
          "name": "Francisco",
          "surname": "Domínguez",
          "email": "frando@mail.com",
          "skills": "Angular, Typescript, Java",
          "studies": "F.P.",
          "location": "Sevilla",
          "experience": 1,
          "hired": false,
          "state": null,
          "interviews": null
      }
    ]

    service.getCandidates().subscribe((res) => {
      expect(res).toEqual(candidate);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/candidate/list');
    expect(req.request.method).toEqual("GET");
    req.flush(candidate);

    httpMock.verify();
  });

  it('updateCandidate() and be a GET request and call the right URL', () =>{

    const candidate: any =
      {
          "id": 1,
          "name": "Francisco",
          "surname": "Domínguez",
          "email": "frando@mail.com",
          "skills": "Angular, Typescript, Java",
          "studies": "F.P.",
          "location": "Sevilla",
          "experience": 1,
          "hired": false,
          "state": null,
          "interviews": null
      };
    service.updateCandidate(candidate).subscribe((res) => {
      expect(res).toEqual(candidate);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/candidate/edit');
    expect(req.request.method).toEqual("PUT");
    expect(req.request.url).toBe('http://localhost:8080/api/candidate/edit');
    req.flush(candidate);

    httpMock.verify();
  });

  it('deleteCandidateById() should be a DELETE request and call proper ID url', () =>{

    const candidate: any ={"id": 1};

    service.deleteCandidateById(candidate.id).subscribe((res) => {
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/candidate/delete/${candidate.id}`);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.url).toBe(`http://localhost:8080/api/candidate/delete/${candidate.id}`);

    req.flush(candidate.id);

    httpMock.verify();

  });

  it('registerNewCandidate() should be a post request', () => {

    let newCandidate: any = {
      "id": 1,
          "name": "Francisco",
          "surname": "Domínguez",
          "email": "frando@mail.com",
          "skills": "Angular, Typescript, Java",
          "studies": "F.P.",
          "location": "Sevilla",
          "experience": 1,
          "hired": false,
          "state": null,
          "interviews": null
    };

    service.registerNewCandidate(newCandidate).subscribe(res => {
      expect(res).toEqual(newCandidate);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/candidate/new');
    expect(req.request.method).toEqual('POST');
    req.flush(newCandidate);

  });

});
