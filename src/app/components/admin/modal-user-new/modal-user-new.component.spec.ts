import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserNewComponent } from './modal-user-new.component';

describe('ModalUserNewComponent', () => {
  let component: ModalUserNewComponent;
  let fixture: ComponentFixture<ModalUserNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
