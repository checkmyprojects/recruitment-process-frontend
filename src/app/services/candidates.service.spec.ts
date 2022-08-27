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
});
