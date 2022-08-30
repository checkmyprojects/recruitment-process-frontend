import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StatisticsService } from './statistics.service';
import { GeneralStatistics } from '../model/generalStats';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StatisticsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getDefault should be a GET request and get data data', () => {

    service.getDefault().subscribe((res) => {
    
    });

    const req = httpMock.expectOne('http://localhost:8080/api/statistics/general');
    expect(req.request.method).toEqual("GET");

    httpMock.verify();
  });

  it('getInterviewsInMonthlyRange should be a POST request and get data data', () => {

    service.getInterviewsInMonthlyRange(2022,12,11,12).subscribe((res) => {
      expect(res).toEqual([12, 21]);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/statistics/interviews/range');
    expect(req.request.method).toEqual("POST");
    req.flush([12, 21]);
    httpMock.verify();
  });

  it('getInterviewsInMonthlyRange should be a GET request and get data data', () => {
    service.getCandidatesPerMonth(12).subscribe((res) => {
    
    });

    const req = httpMock.expectOne('http://localhost:8080/api/statistics/selection/applicants');
    expect(req.request.method).toEqual("POST");
    req.flush(12);
    httpMock.verify();
  });

});
