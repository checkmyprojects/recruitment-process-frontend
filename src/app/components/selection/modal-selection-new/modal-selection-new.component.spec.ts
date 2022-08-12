import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectionNewComponent } from './modal-selection-new.component';

describe('ModalSelectionNewComponent', () => {
  let component: ModalSelectionNewComponent;
  let fixture: ComponentFixture<ModalSelectionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectionNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
