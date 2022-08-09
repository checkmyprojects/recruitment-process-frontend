import { Interview } from './../model/interview';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const InterviewAPI = "http://localhost:8080/api/interview/";



@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http:HttpClient) { }

  getInterviews(): Observable<Object[]>
  {
    return this.http.get(InterviewAPI + "list", {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}) as Observable<Object[]>;
  }

  public getAllInterviews(): Observable<Interview[]>{
    return this.http.get<Interview[]>(`${this.apiServerUrl}/api/interview/list`);
  }
}
