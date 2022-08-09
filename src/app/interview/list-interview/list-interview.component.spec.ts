import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterviewComponent } from './list-interview.component';

describe('ListInterviewComponent', () => {
  let component: ListInterviewComponent;
  let fixture: ComponentFixture<ListInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
