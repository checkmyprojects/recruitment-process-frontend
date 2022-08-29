import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/statistics/';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService
{
  constructor(private http:HttpClient){}

  getInterviewsInMonthlyRange(fromYear: number, fromMonth: number, toYear: number, toMonth: number): Observable<number[]>
  {
    return this.http.post<number[]>(API_URL + "interviews/range", {fromYear, fromMonth, toYear, toMonth});
  }
}