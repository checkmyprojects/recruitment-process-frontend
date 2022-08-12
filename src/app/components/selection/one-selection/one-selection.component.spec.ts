import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSelectionComponent } from './one-selection.component';

describe('OneSelectionComponent', () => {
  let component: OneSelectionComponent;
  let fixture: ComponentFixture<OneSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
