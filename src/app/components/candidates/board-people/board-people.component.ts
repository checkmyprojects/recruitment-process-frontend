import { Component, OnInit } from '@angular/core';
import { GuardService } from 'src/app/services/guard.service';

@Component({
  selector: 'app-board-people',
  templateUrl: './board-people.component.html',
  styleUrls: ['./board-people.component.css']
})
export class BoardPeopleComponent implements OnInit {

  constructor(guard: GuardService)
  {
    guard.isPeople();
  }

  ngOnInit(): void {
  }

}
