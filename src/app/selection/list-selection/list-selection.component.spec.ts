import { SelectionService } from 'src/app/_services/selection.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSelectionComponent } from './list-selection.component';

describe('ListSelectionComponent', () => {
  let component: ListSelectionComponent;
  let fixture: ComponentFixture<ListSelectionComponent>;
  let service: SelectionService;

  let httpMock: HttpTestingController;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSelectionComponent ],
      imports: [HttpClientTestingModule],
      providers: [SelectionService]


    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SelectionService);


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSelection on ngOnit with a GET method', () => {
    const selection : any[] =
    [
      {
          "id": 5,
          "created_by": null,
          "start_date": "2022-09-12",
          "end_date": null,
          "name": "Java Spring Boot",
          "description": "Senior Java Team manager",
          "requirements": "Java, Spring Boot",
          "location": "Sevilla",
          "sector": "Health",
          "status": "Active",
          "priority": "High",
          "project_id": 123123123,
          "remote": false,
          "interviews": null
      }
  ]
  const req = httpMock.expectOne('http://localhost:8080/api/selection/list');
  expect(req.request.method).toEqual("GET");
    req.flush(selection);
    httpMock.verify();
  });
});
