import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { UserService } from '../_services/user.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let service: UserService;
  let httpMock: HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ HomeComponent ],
      providers: [ UserService ]
    })
    
    .compileComponents();
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {

    

    expect(component).toBeTruthy();
  });

  it('should call getPublicContent on ngOnInit with a GET method', () => {


    const response: string = 'testing';

    // service.getPublicContent().subscribe((res) => {
    //   expect(res).toEqual(response);
    // });
    // expect(component.content).toEqual('testing');
    const req = httpMock.expectOne('http://localhost:8080/api/test/all');
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    expect(req.request.url.endsWith("test/all")).toEqual(true);
    httpMock.verify();
  });
});
