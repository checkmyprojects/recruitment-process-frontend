import { Component, OnInit } from '@angular/core';
import { GuardService } from 'src/app/services/guard.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  constructor(guard: GuardService)
  {
    guard.isPeople();
  }

  ngOnInit(): void {
  }

}
