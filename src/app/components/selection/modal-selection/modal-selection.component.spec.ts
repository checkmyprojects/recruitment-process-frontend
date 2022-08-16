import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectionComponent } from './modal-selection.component';

describe('ModalSelectionComponent', () => {
  let component: ModalSelectionComponent;
  let fixture: ComponentFixture<ModalSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
