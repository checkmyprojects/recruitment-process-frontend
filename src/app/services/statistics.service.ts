import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidatesPerMonth } from '../model/candidatesPerMonth';
import { GeneralStatistics } from '../model/generalStats';

const API_URL = 'http://localhost:8080/api/statistics/';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService
{
  //Inject the HTTP client to make requests to the backend
  constructor(private http: HttpClient){}

  //Retrieve from the backend the data to display the default statistics
  getDefault(): Observable<GeneralStatistics>
  {
    return this.http.get<GeneralStatistics>(API_URL + "general");
  }

  //Retrieve from the backend the number of interviews per month, distributed as an array
  getInterviewsInMonthlyRange(fromYear: number, fromMonth: number, toYear: number, toMonth: number): Observable<number[]>
  {
    return this.http.post<number[]>(API_URL + "interviews/range", {fromYear, fromMonth, toYear, toMonth});
  }

  //Retrieve from the backend the candidates per month of a selection process
  getCandidatesPerMonth(process_id: number): Observable<CandidatesPerMonth>
  {
    return this.http.post<CandidatesPerMonth>(API_URL + "selection/applicants", process_id);
  }
}