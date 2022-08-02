import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { CandidateComponent } from './candidate.component';

describe('CandidateComponent', () => {
  let component: CandidateComponent;
  let fixture: ComponentFixture<CandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateComponent);
    component = fixture.componentInstance;
    component.user = {
      "id": 3,
      "name": "people",
      "username": "people",
      "email": "people@mail.com",
      "roles": ["admin"],
      "active": true
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isEditToggle changed isEdit value', () => {
    component.isEdit = false;
    component.isEditToggle();
    expect(component.isEdit).toEqual(true);
  });

  it('isDeleted and isEdit should be false by default', () => {
    expect(component.isDeleted).toEqual(false);
    expect(component.isEdit).toEqual(false);
  });
});
