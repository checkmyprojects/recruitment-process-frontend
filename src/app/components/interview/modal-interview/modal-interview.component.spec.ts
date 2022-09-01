import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInterviewComponent } from './modal-interview.component';

describe('ModalInterviewComponent', () => {
  let component: ModalInterviewComponent;
  let fixture: ComponentFixture<ModalInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
