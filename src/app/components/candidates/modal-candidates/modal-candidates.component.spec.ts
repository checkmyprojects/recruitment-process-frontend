import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCandidatesComponent } from './modal-candidates.component';

describe('ModalCandidatesComponent', () => {
  let component: ModalCandidatesComponent;
  let fixture: ComponentFixture<ModalCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
