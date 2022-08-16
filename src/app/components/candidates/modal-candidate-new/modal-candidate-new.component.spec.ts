import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCandidateNewComponent } from './modal-candidate-new.component';

describe('ModalCandidateNewComponent', () => {
  let component: ModalCandidateNewComponent;
  let fixture: ComponentFixture<ModalCandidateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCandidateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCandidateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
