import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidatesComponent } from './list-candidates.component';

describe('ListCandidatesComponent', () => {
  let component: ListCandidatesComponent;
  let fixture: ComponentFixture<ListCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
