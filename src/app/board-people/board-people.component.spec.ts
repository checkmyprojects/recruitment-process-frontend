import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPeopleComponent } from './board-people.component';

describe('BoardPeopleComponent', () => {
  let component: BoardPeopleComponent;
  let fixture: ComponentFixture<BoardPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
