import { CandidatesService } from './../../_services/candidates.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidatesComponent } from './list-candidates.component';

describe('ListCandidatesComponent', () => {
  let component: ListCandidatesComponent;
  let fixture: ComponentFixture<ListCandidatesComponent>;
  let service: CandidatesService;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCandidatesComponent ],
      imports: [HttpClientTestingModule],
      providers: [ CandidatesService ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CandidatesService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCandidates on ngOnInit with a GET method', () => {
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
    const req = httpMock.expectOne('http://localhost:8080/api/candidate/list');
    expect(req.request.method).toEqual("GET");
    req.flush(candidate);
    httpMock.verify();

  });
});
