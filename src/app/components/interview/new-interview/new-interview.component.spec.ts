import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInterviewComponent } from './new-interview.component';

describe('NewInterviewComponent', () => {
  let component: NewInterviewComponent;
  let fixture: ComponentFixture<NewInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
