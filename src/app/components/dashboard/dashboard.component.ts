import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

/**
 * @title dinamic grid-list
 */
@Component({
  selector: 'dashboard.component',
  styleUrls: ['dashboard.component.css'],
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent {
  tiles: Tile[] = [
    { text: 'Administración', cols: 3, rows: 2, color: 'lightblue' },
    { text: 'Candidatos', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Procesos', cols: 1, rows: 2, color: 'lightpink' },
    { text: 'Entrevistas', cols: 2, rows: 2, color: '#DDBDF1' },
    { text: 'Estadísticas', cols: 1, rows: 2, color: '#DDBDF1' },
  ];
}
