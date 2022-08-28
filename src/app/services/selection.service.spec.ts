import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { request } from 'http';

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

  it('updateSelections() and be a GET request and call the right URL', () =>{
    const names: any= {name: 'a'};

    service.updateSelections(names).subscribe((res) => {
      expect(res).toEqual(names);
    })

    const req = httpMock.expectOne('http://localhost:8080/api/selection/edit');
    expect(req.request.method).toEqual("PUT");
    expect(req.request.url).toBe('http://localhost:8080/api/selection/edit');
    req.flush(names);

    httpMock.verify();
  });

  it('endSelectionById() should return correct selection', () => {
    const id= 1;
    let user = {id: 1, name: "name"}


    service.endSelectionById(id).subscribe((res) => {
      expect(res).toEqual(user);

    });

    const req = httpMock.expectOne(`http://localhost:8080/api/selection/end/${id}`);
    expect(req.request.method).toEqual("GET");
    expect(req.request.url).toBe(`http://localhost:8080/api/selection/end/${id}`);
    req.flush(user);

    httpMock.verify();
  });

  it ('deleteSelectionById() should be a DELETE request and call proper ID url', ()=> {

    const selection: any = {"id": 1};

    service.deleteSelectionById(selection.id).subscribe((res) => {
  })

  const req = httpMock.expectOne(`http://localhost:8080/api/selection/delete/${selection.id}`);
  expect(req.request.method).toEqual('DELETE');
  expect(req.request.url).toBe(`http://localhost:8080/api/selection/delete/${selection.id}`);

  req.flush(selection.id);

  httpMock.verify();
});
it ('registerNewSelection() should be a post request', () => {

  let newSelection: any = {name: 'a'}

  service.registerNewSelection(newSelection).subscribe((res) => {
    expect(res).toEqual(newSelection);
  });

  const req = httpMock.expectOne('http://localhost:8080/api/selection/new');
  expect(req.request.method).toEqual("POST");
  req.flush(newSelection);

});
});
