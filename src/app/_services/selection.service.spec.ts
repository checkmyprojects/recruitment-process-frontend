import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SelectionService } from './selection.service';


describe('SelectionService', () => {
  let service: SelectionService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [ SelectionService ]
    });
    service = TestBed.get(SelectionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Do getSelections() and be a GET request and call the right URL', () => {
    const names = [{name: 'a'}, {name: 'b'}];

    service.getSelections().subscribe((res) => {
      expect(res).toEqual(names);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/selection/list');
    expect(req.request.method).toEqual("GET");
    req.flush(names);

    httpMock.verify();
  });
});
