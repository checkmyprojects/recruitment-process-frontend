import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const InterviewAPI = "http://localhost:8080/api/interview/";

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http:HttpClient) { }

  getInterviews(): Observable<Object[]>
  {
    return this.http.
    get(InterviewAPI + "list", {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}) as 
    Observable<Object[]>;
  }
}
